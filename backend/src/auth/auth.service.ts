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
import { RefreshResult } from 'src/auth/types/refresh-result.type';
import {
  AccessTokenPayload,
  JwtExpPayload,
  RefreshTokenPayload,
} from 'src/auth/types/jwt-payload.type';
import { generateId } from 'src/common/utils/id.util';

@Injectable()
export class AuthService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;

  constructor(
    private readonly userRepository: UsersRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.accessSecret = this.configService.getOrThrow<string>(
      'ACCESS_TOKEN_SECRET',
    );
    this.refreshSecret = this.configService.getOrThrow<string>(
      'REFRESH_TOKEN_SECRET',
    );
  }

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

    const sid = await generateId();

    const payload: AccessTokenPayload = {
      sub: user.id,
      email: user.email,
      sid,
      type: 'access',
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.accessSecret,
      expiresIn: this.configService.getOrThrow('ACCESS_TOKEN_TTL'),
    });
    const refreshToken = this.jwtService.sign(
      { ...payload, type: 'refresh' },
      {
        secret: this.refreshSecret,
        expiresIn: this.configService.getOrThrow('REFRESH_TOKEN_TTL'),
      },
    );

    const now = Date.now();
    const { exp: accessExp } = await this.jwtService.verifyAsync<JwtExpPayload>(
      accessToken,
      { secret: this.accessSecret },
    );
    const { exp: refreshExp } =
      await this.jwtService.verifyAsync<JwtExpPayload>(refreshToken, {
        secret: this.refreshSecret,
      });

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

  async logout(refreshToken?: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    let payload: RefreshTokenPayload;

    try {
      payload = await this.jwtService.verifyAsync<RefreshTokenPayload>(
        refreshToken,
        {
          secret: this.refreshSecret,
        },
      );
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.sessionRepository.revokeSession(payload.sid);
  }

  async refresh(refreshToken?: string): Promise<RefreshResult> {
    if (!refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    let decoded: RefreshTokenPayload;

    try {
      decoded = await this.jwtService.verifyAsync<RefreshTokenPayload>(
        refreshToken,
        {
          secret: this.refreshSecret,
        },
      );
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (decoded.type !== 'refresh') {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const session = await this.sessionRepository.findSessionById(decoded.sid);

    if (!session) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (session.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (decoded.sub !== session.userId) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload: AccessTokenPayload = {
      sub: decoded.sub,
      email: decoded.email,
      sid: decoded.sid,
      type: 'access',
    };

    const newAccessToken = this.jwtService.sign(payload, {
      secret: this.accessSecret,
      expiresIn: this.configService.getOrThrow('ACCESS_TOKEN_TTL'),
    });
    const newRefreshToken = this.jwtService.sign(
      { ...payload, type: 'refresh' },
      {
        secret: this.refreshSecret,
        expiresIn: this.configService.getOrThrow('REFRESH_TOKEN_TTL'),
      },
    );

    const now = Date.now();
    const { exp: accessExp } = await this.jwtService.verifyAsync<JwtExpPayload>(
      newAccessToken,
      { secret: this.accessSecret },
    );
    const { exp: refreshExp } =
      await this.jwtService.verifyAsync<JwtExpPayload>(newRefreshToken, {
        secret: this.refreshSecret,
      });

    try {
      await this.sessionRepository.rotateSession({
        sid: decoded.sid,
        refreshToken: newRefreshToken,
        curRefreshToken: refreshToken,
        expiresAt: new Date(refreshExp * 1000).toISOString(),
        ttl: refreshExp,
        updatedAt: new Date(now).toISOString(),
      });
    } catch (error) {
      const err = error as { name?: string };

      if (err.name === 'ConditionalCheckFailedException') {
        throw new UnauthorizedException('Invalid refresh token');
      }

      throw error;
    }

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      accessTokenMaxAgeMs: Math.max(accessExp * 1000 - now, 0),
      refreshTokenMaxAgeMs: Math.max(refreshExp * 1000 - now, 0),
    };
  }
}
