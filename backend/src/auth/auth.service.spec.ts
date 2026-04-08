import {
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash as argonHash } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SessionRepository } from 'src/session/session.repository';
import { UsersRepository } from 'src/users/users.repository';
import { AuthService } from './auth.service';

type MockUsersRepository = {
  findByEmail: jest.MockedFunction<UsersRepository['findByEmail']>;
  createUser: jest.MockedFunction<UsersRepository['createUser']>;
};

type MockSessionRepository = {
  createSession: jest.MockedFunction<SessionRepository['createSession']>;
};

type MockJwtService = {
  sign: jest.Mock;
  verifyAsync: jest.Mock;
};

type MockConfigService = {
  getOrThrow: jest.Mock;
};

describe('AuthService', () => {
  let service: AuthService;
  let usersRepository: MockUsersRepository;
  let sessionRepository: MockSessionRepository;
  let jwtService: MockJwtService;
  let configService: MockConfigService;

  beforeEach(() => {
    usersRepository = {
      findByEmail: jest.fn(),
      createUser: jest.fn(),
    };

    sessionRepository = {
      createSession: jest.fn(),
    };

    jwtService = {
      sign: jest.fn(),
      verifyAsync: jest.fn(),
    };

    const configMap: Record<string, string> = {
      ACCESS_TOKEN_SECRET: 'access-secret',
      REFRESH_TOKEN_SECRET: 'refresh-secret',
      ACCESS_TOKEN_TTL: '15m',
      REFRESH_TOKEN_TTL: '7d',
    };

    configService = {
      getOrThrow: jest.fn((key: string) => {
        const value = configMap[key];
        if (!value) {
          throw new Error(`Missing config: ${key}`);
        }
        return value;
      }),
    };

    service = new AuthService(
      usersRepository as unknown as UsersRepository,
      sessionRepository as unknown as SessionRepository,
      jwtService as unknown as JwtService,
      configService as unknown as ConfigService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('throws BadRequestException when password confirmation does not match', async () => {
    await expect(
      service.register({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password-123',
        confirmPassword: 'password-456',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(usersRepository.findByEmail).not.toHaveBeenCalled();
    expect(usersRepository.createUser).not.toHaveBeenCalled();
  });

  it('throws ConflictException when user already exists', async () => {
    usersRepository.findByEmail.mockResolvedValue({
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed-password',
      credits: 15,
    });

    await expect(
      service.register({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password-123',
        confirmPassword: 'password-123',
      }),
    ).rejects.toBeInstanceOf(ConflictException);

    expect(usersRepository.findByEmail).toHaveBeenCalledWith(
      'john@example.com',
    );
    expect(usersRepository.createUser).not.toHaveBeenCalled();
  });

  it('hashes password, creates user, and returns public user payload', async () => {
    usersRepository.findByEmail.mockResolvedValue(null);
    let capturedCreateUserPayload:
      | Parameters<UsersRepository['createUser']>[0]
      | undefined;

    usersRepository.createUser.mockImplementation((input) => {
      capturedCreateUserPayload = input;

      return Promise.resolve({
        id: 'user-2',
        name: input.name,
        email: input.email,
        password: input.password,
        credits: 15,
        createdAt: '2026-04-07T00:00:00.000Z',
        updatedAt: '2026-04-07T00:00:00.000Z',
        pwdUpdatedAt: '2026-04-07T00:00:00.000Z',
      });
    });

    const result = await service.register({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password-123',
      confirmPassword: 'password-123',
    });

    expect(usersRepository.findByEmail).toHaveBeenCalledWith(
      'john@example.com',
    );
    expect(usersRepository.createUser).toHaveBeenCalledTimes(1);
    expect(usersRepository.createUser).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'John Doe',
        email: 'john@example.com',
      }),
    );

    if (!capturedCreateUserPayload) {
      throw new Error('Expected createUser payload');
    }

    expect(capturedCreateUserPayload.password).not.toBe('password-123');
    expect(typeof capturedCreateUserPayload.password).toBe('string');

    expect(result).toEqual({
      id: 'user-2',
      name: 'John Doe',
      email: 'john@example.com',
      credits: 15,
      createdAt: '2026-04-07T00:00:00.000Z',
      updatedAt: '2026-04-07T00:00:00.000Z',
      pwdUpdatedAt: '2026-04-07T00:00:00.000Z',
    });
    expect(result).not.toHaveProperty('password');
  });

  it('throws UnauthorizedException when login email does not exist', async () => {
    usersRepository.findByEmail.mockResolvedValue(null);

    await expect(
      service.login({
        email: 'john@example.com',
        password: 'password-123',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);

    expect(jwtService.sign).not.toHaveBeenCalled();
    expect(sessionRepository.createSession).not.toHaveBeenCalled();
  });

  it('throws UnauthorizedException when login password is invalid', async () => {
    const storedHash = await argonHash('correct-password');
    usersRepository.findByEmail.mockResolvedValue({
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      password: storedHash,
      credits: 15,
    });

    await expect(
      service.login({
        email: 'john@example.com',
        password: 'password-123',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);

    expect(jwtService.sign).not.toHaveBeenCalled();
    expect(sessionRepository.createSession).not.toHaveBeenCalled();
  });

  it('generates tokens, persists session, and returns cookie maxAge values', async () => {
    const now = 1_700_000_000_000;
    const accessExp = 1_700_000_300;
    const refreshExp = 1_700_086_400;
    const nowSpy = jest.spyOn(Date, 'now').mockReturnValue(now);

    usersRepository.findByEmail.mockResolvedValue({
      id: 'user-2',
      name: 'John Doe',
      email: 'john@example.com',
      password: await argonHash('password-123'),
      credits: 15,
      createdAt: '2026-04-08T00:00:00.000Z',
      updatedAt: '2026-04-08T00:00:00.000Z',
      pwdUpdatedAt: '2026-04-08T00:00:00.000Z',
    });

    jwtService.sign.mockImplementation(
      (_payload: unknown, options?: { secret?: string }) => {
        if (options?.secret === 'access-secret') return 'access-token';
        if (options?.secret === 'refresh-secret') return 'refresh-token';
        return 'unknown-token';
      },
    );

    jwtService.verifyAsync.mockImplementation((token: string) => {
      if (token === 'access-token') return Promise.resolve({ exp: accessExp });
      if (token === 'refresh-token')
        return Promise.resolve({ exp: refreshExp });

      return Promise.reject(new Error(`Unexpected token: ${token}`));
    });

    jest
      .spyOn(
        service as unknown as { generateSessionId: () => Promise<string> },
        'generateSessionId',
      )
      .mockResolvedValue('session-1');

    const result = await service.login({
      email: 'john@example.com',
      password: 'password-123',
    });

    expect(sessionRepository.createSession).toHaveBeenCalledTimes(1);
    const [createSessionPayload] =
      sessionRepository.createSession.mock.calls[0] ?? [];
    if (!createSessionPayload) {
      throw new Error('Expected createSession payload');
    }

    expect(createSessionPayload.sid).toBe('session-1');
    expect(createSessionPayload.userId).toBe('user-2');
    expect(typeof createSessionPayload.refreshToken).toBe('string');
    expect(createSessionPayload.expiresAt).toBe(
      new Date(refreshExp * 1000).toISOString(),
    );
    expect(createSessionPayload.ttl).toBe(refreshExp);

    expect(result).toEqual({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      user: {
        id: 'user-2',
        name: 'John Doe',
        email: 'john@example.com',
        credits: 15,
        createdAt: '2026-04-08T00:00:00.000Z',
        updatedAt: '2026-04-08T00:00:00.000Z',
        pwdUpdatedAt: '2026-04-08T00:00:00.000Z',
      },
      accessTokenMaxAgeMs: accessExp * 1000 - now,
      refreshTokenMaxAgeMs: refreshExp * 1000 - now,
    });

    nowSpy.mockRestore();
  });
});
