import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { argon2id, hash, verify } from 'argon2';
import { UsersRepository } from 'src/users/users.repository';
import { mapUserToPublicUser, PublicUser } from 'src/users/mappers/user.mapper';
import { LoginDto } from 'src/auth/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginResult } from './types/login-result.type';
import { SessionRepository } from 'src/session/session.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<PublicUser> {
    const { name, email, password, confirmPassword } = registerDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('Password confirmation does not match');
    }

    // check if email existed
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // hash password
    const hashPassword = await hash(password, {
      type: argon2id,
    });

    const createdUser = await this.userRepository.createUser({
      name,
      email,
      password: hashPassword,
    });

    return mapUserToPublicUser(createdUser);
  }

  async login(loginDto: LoginDto): Promise<LoginResult> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await verify(user.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const sid = await this.generateSessionId();

    const payload = { sub: user.id, email: user.email, sid, type: 'access' };
    const accessSecret = this.configService.getOrThrow<string>(
      'ACCESS_TOKEN_SECRET',
    );
    const refreshSecret = this.configService.getOrThrow<string>(
      'REFRESH_TOKEN_SECRET',
    );

    const accessToken = this.jwtService.sign(payload, {
      secret: accessSecret,
      expiresIn: this.configService.getOrThrow('ACCESS_TOKEN_TTL'),
    });
    const refreshToken = this.jwtService.sign(
      { ...payload, type: 'refresh' },
      {
        secret: refreshSecret,
        expiresIn: this.configService.getOrThrow('REFRESH_TOKEN_TTL'),
      },
    );

    const now = Date.now();
    const { exp: accessExp } = await this.jwtService.verifyAsync<{
      exp: number;
    }>(accessToken, { secret: accessSecret });
    const { exp: refreshExp } = await this.jwtService.verifyAsync<{
      exp: number;
    }>(refreshToken, { secret: refreshSecret });

    await this.sessionRepository.createSession({
      sid,
      userId: user.id,
      refreshToken,
      expiresAt: new Date(refreshExp * 1000).toISOString(),
      ttl: refreshExp,
    });

    return {
      accessToken,
      refreshToken,
      user: mapUserToPublicUser(user),
      accessTokenMaxAgeMs: Math.max(accessExp * 1000 - now, 0),
      refreshTokenMaxAgeMs: Math.max(refreshExp * 1000 - now, 0),
    };
  }

  private async generateSessionId(): Promise<string> {
    const { v7: uuidv7 } = await import('uuid');
    return uuidv7();
  }
}
