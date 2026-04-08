import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @Transform(({ value }) => {
    const input = value as unknown;
    return typeof input === 'string' ? input.trim().toLowerCase() : input;
  })
  email!: string;

  @IsString()
  password!: string;
}
