import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RegisterDto } from 'src/auth/dto/register.dto';

describe('RegisterDto', () => {
  it('normalizes name and email values', async () => {
    const dto = plainToInstance(RegisterDto, {
      name: '   john    doe   ',
      email: '  John.Doe@Example.COM  ',
      password: 'password-123',
      confirmPassword: 'password-123'
    });

    expect(dto.name).toBe('john doe');
    expect(dto.email).toBe('john.doe@example.com');

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('keeps password fields unchanged', () => {
    const dto = plainToInstance(RegisterDto, {
      name: 'John Doe',
      email: 'john@example.com',
      password: '  password-123  ',
      confirmPassword: '  password-123  '
    });

    expect(dto.password).toBe('  password-123  ');
    expect(dto.confirmPassword).toBe('  password-123  ');
  });
});
