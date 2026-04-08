import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import type { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from './auth.controller';

type MockAuthService = {
  register: jest.MockedFunction<AuthService['register']>;
  login: jest.MockedFunction<AuthService['login']>;
};

describe('AuthController', () => {
  let controller: AuthController;
  let authService: MockAuthService;
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
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

  it('sets auth cookies and returns user payload for login', async () => {
    process.env.NODE_ENV = 'prod';

    const loginDto = {
      email: 'john@example.com',
      password: 'password-123',
    };
    const loginResult = {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      accessTokenMaxAgeMs: 900_000,
      refreshTokenMaxAgeMs: 604_800_000,
      user: {
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        credits: 15,
      },
    };

    const cookieSpy = jest.fn();
    const response = {
      cookie: cookieSpy,
    } as unknown as Response;

    authService.login.mockResolvedValue(loginResult);

    await expect(controller.login(loginDto, response)).resolves.toEqual({
      user: loginResult.user,
    });

    expect(authService.login).toHaveBeenCalledWith(loginDto);
    expect(cookieSpy).toHaveBeenNthCalledWith(
      1,
      'accessToken',
      'access-token',
      {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 900_000,
      },
    );
    expect(cookieSpy).toHaveBeenNthCalledWith(
      2,
      'refreshToken',
      'refresh-token',
      {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 604_800_000,
        path: '/auth',
      },
    );
  });

  it('propagates service errors from login', async () => {
    const loginDto = {
      email: 'john@example.com',
      password: 'password-123',
    };
    const cookieSpy = jest.fn();
    const response = {
      cookie: cookieSpy,
    } as unknown as Response;
    const unauthorizedError = new UnauthorizedException('Invalid credentials');

    authService.login.mockRejectedValue(unauthorizedError);

    await expect(controller.login(loginDto, response)).rejects.toBe(
      unauthorizedError,
    );
    expect(cookieSpy).not.toHaveBeenCalled();
  });
});
