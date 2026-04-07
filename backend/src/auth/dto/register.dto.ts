import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => {
    const input = value as unknown;

    if (typeof input !== 'string') return input;

    return input.trim().replace(/\s+/g, ' ');
  })
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => {
    const input = value as unknown;
    return typeof input === 'string' ? input.trim().toLowerCase() : input;
  })
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword!: string;
}
