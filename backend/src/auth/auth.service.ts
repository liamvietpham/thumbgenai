import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { argon2id, hash } from 'argon2';
import { UsersRepository } from 'src/users/users.repository';
import { mapUserToPublicUser, PublicUser } from 'src/users/mappers/user.mapper';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UsersRepository) {}

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
}
