import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { argon2id, hash } from 'argon2';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UsersRepository) {}

  async register(registerDto: RegisterDto) {
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

    return await this.userRepository.createUser({
      name,
      email,
      password: hashPassword,
    });
  }
}
