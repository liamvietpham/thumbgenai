import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from './auth.controller';

type MockAuthService = {
  register: jest.MockedFunction<AuthService['register']>;
};

describe('AuthController', () => {
  let controller: AuthController;
  let authService: MockAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('forwards register payload to auth service and returns result', async () => {
    const registerDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password-123',
      confirmPassword: 'password-123',
    };
    const registerResult = {
      id: 'user-2',
      name: 'John Doe',
      email: 'john@example.com',
      credits: 15,
      createdAt: '2026-04-07T00:00:00.000Z',
      updatedAt: '2026-04-07T00:00:00.000Z',
      pwdUpdatedAt: '2026-04-07T00:00:00.000Z',
    };

    authService.register.mockResolvedValue(registerResult);

    await expect(controller.register(registerDto)).resolves.toEqual(
      registerResult,
    );
    expect(authService.register).toHaveBeenCalledTimes(1);
    expect(authService.register).toHaveBeenCalledWith(registerDto);
  });

  it('propagates service errors from register', async () => {
    const registerDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password-123',
      confirmPassword: 'password-123',
    };
    const conflictError = new ConflictException('User already exists');

    authService.register.mockRejectedValue(conflictError);

    await expect(controller.register(registerDto)).rejects.toBe(conflictError);
    expect(authService.register).toHaveBeenCalledWith(registerDto);
  });
});
