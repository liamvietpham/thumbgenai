import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { argon2id, hash } from 'argon2';
import { RefreshTokenPayload } from 'src/auth/types/jwt-payload.type';
import { generateId } from 'src/common/utils/id.util';
import { createApp } from '../src/app.factory';
import { SessionRepository } from '../src/session/session.repository';
import { UsersRepository } from '../src/users/users.repository';

jest.mock('src/common/utils/id.util', () => ({
  generateId: jest.fn(),
}));

type ErrorResponse = {
  success: boolean;
  statusCode: number;
  message: string | string[];
  path: string;
};

type LoginSuccessResponse = {
  success: boolean;
  statusCode: number;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      credits: number;
    };
  };
};

type LogoutSuccessResponse = {
  success: boolean;
  statusCode: number;
  data: {
    message: string;
  };
};

type RefreshSuccessResponse = {
  success: boolean;
  statusCode: number;
  data: {
    message: string;
  };
};

const ACCESS_TOKEN_SECRET = 'test-access-secret';
const REFRESH_TOKEN_SECRET = 'test-refresh-secret';
const ACCESS_TOKEN_TTL = '15m';
const REFRESH_TOKEN_TTL = '7d';

describe('AuthModule (e2e)', () => {
  let app: INestApplication;
  let baseUrl: string;
  const mockGenerateId = generateId as jest.MockedFunction<typeof generateId>;

  beforeEach(async () => {
    mockGenerateId.mockReset();
    mockGenerateId.mockResolvedValue('session-1');

    process.env.NODE_ENV = 'test';
    process.env.AWS_REGION = 'ap-southeast-1';
    process.env.USERS_TABLE = 'users-test';
    process.env.SESSIONS_TABLE = 'sessions-test';
    process.env.ACCESS_TOKEN_SECRET = ACCESS_TOKEN_SECRET;
    process.env.REFRESH_TOKEN_SECRET = REFRESH_TOKEN_SECRET;
    process.env.ACCESS_TOKEN_TTL = ACCESS_TOKEN_TTL;
    process.env.REFRESH_TOKEN_TTL = REFRESH_TOKEN_TTL;
    process.env.CORS_ORIGIN = 'http://localhost:3000';

    app = await createApp();
    await app.listen(0, '127.0.0.1');
    baseUrl = await app.getUrl();
  });

  it('POST /auth/register returns 400 when password confirmation does not match', async () => {
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password-123',
        confirmPassword: 'password-456',
      }),
    });
    const body = (await response.json()) as ErrorResponse;

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.statusCode).toBe(400);
    expect(body.message).toBe('Password confirmation does not match');
    expect(body.path).toBe('/auth/register');
  });

  it('POST /auth/login returns 400 when DTO validation fails', async () => {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: 'not-an-email',
        password: 'password-123',
      }),
    });
    const body = (await response.json()) as ErrorResponse;

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.statusCode).toBe(400);
    expect(body.message).toEqual(['email must be an email']);
    expect(body.path).toBe('/auth/login');
  });

  it('POST /auth/login sets auth cookies and returns public user', async () => {
    const storedHash = await hash('password-123', {
      type: argon2id,
    });

    const findByEmailSpy = jest
      .spyOn(UsersRepository.prototype, 'findByEmail')
      .mockResolvedValue({
        id: 'user-1',
        name: 'John Doe',
        email: 'john@example.com',
        password: storedHash,
        credits: 15,
        createdAt: '2026-04-08T00:00:00.000Z',
        updatedAt: '2026-04-08T00:00:00.000Z',
        pwdUpdatedAt: '2026-04-08T00:00:00.000Z',
      });

    const createSessionSpy = jest
      .spyOn(SessionRepository.prototype, 'createSession')
      .mockResolvedValue(undefined);

    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: 'john@example.com',
        password: 'password-123',
      }),
    });
    const body = (await response.json()) as LoginSuccessResponse;
    const setCookieHeader = response.headers.get('set-cookie') ?? '';

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.statusCode).toBe(200);
    expect(body.data.user).toMatchObject({
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      credits: 15,
    });

    expect(setCookieHeader).toContain('accessToken=');
    expect(setCookieHeader).toContain('refreshToken=');
    expect(setCookieHeader).toContain('HttpOnly');
    expect(setCookieHeader).toContain('Path=/auth');

    expect(findByEmailSpy).toHaveBeenCalledWith('john@example.com');
    expect(mockGenerateId).toHaveBeenCalledTimes(1);
    expect(createSessionSpy).toHaveBeenCalledTimes(1);
  });

  it('POST /auth/logout revokes the session, clears cookies, and returns 200', async () => {
    const revokeSessionSpy = jest
      .spyOn(SessionRepository.prototype, 'revokeSession')
      .mockResolvedValue(undefined);
    const jwtService = app.get(JwtService);
    const payload: RefreshTokenPayload = {
      sub: 'user-1',
      email: 'john@example.com',
      sid: 'session-1',
      type: 'refresh',
    };
    const refreshToken = jwtService.sign(payload, {
      secret: REFRESH_TOKEN_SECRET,
      expiresIn: REFRESH_TOKEN_TTL,
    });

    const response = await fetch(`${baseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });
    const body = (await response.json()) as LogoutSuccessResponse;
    const setCookieHeader = response.headers.get('set-cookie') ?? '';

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      statusCode: 200,
      data: {
        message: 'Logged out successfully',
      },
    });

    expect(setCookieHeader).toContain('accessToken=');
    expect(setCookieHeader).toContain('refreshToken=');
    expect(setCookieHeader).toContain('Path=/auth');
    expect(revokeSessionSpy).toHaveBeenCalledWith('session-1');
  });

  it('POST /auth/logout returns 401 when refresh token cookie is missing', async () => {
    const response = await fetch(`${baseUrl}/auth/logout`, {
      method: 'POST',
    });
    const body = (await response.json()) as ErrorResponse;
    const setCookieHeader = response.headers.get('set-cookie') ?? '';

    expect(response.status).toBe(401);
    expect(body.success).toBe(false);
    expect(body.statusCode).toBe(401);
    expect(body.message).toBe('Invalid refresh token');
    expect(body.path).toBe('/auth/logout');
    expect(setCookieHeader).toContain('accessToken=');
    expect(setCookieHeader).toContain('refreshToken=');
  });

  it('POST /auth/logout returns 401 when refresh token is invalid', async () => {
    const response = await fetch(`${baseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        cookie: 'refreshToken=invalid-token',
      },
    });
    const body = (await response.json()) as ErrorResponse;

    expect(response.status).toBe(401);
    expect(body.success).toBe(false);
    expect(body.statusCode).toBe(401);
    expect(body.message).toBe('Invalid refresh token');
    expect(body.path).toBe('/auth/logout');
  });

  it('POST /auth/refresh rotates cookies and returns 200', async () => {
    const rotateSessionSpy = jest
      .spyOn(SessionRepository.prototype, 'rotateSession')
      .mockResolvedValue(undefined);
    const findSessionByIdSpy = jest
      .spyOn(SessionRepository.prototype, 'findSessionById')
      .mockResolvedValue({
        id: 'session-1',
        userId: 'user-1',
        refreshToken: 'placeholder',
        ttl: 1_700_000_000,
        expiresAt: '2026-04-08T00:00:00.000Z',
        createdAt: '2026-04-08T00:00:00.000Z',
        updatedAt: '2026-04-08T00:00:00.000Z',
      });
    const jwtService = app.get(JwtService);
    const payload: RefreshTokenPayload = {
      sub: 'user-1',
      email: 'john@example.com',
      sid: 'session-1',
      type: 'refresh',
    };
    const refreshToken = jwtService.sign(payload, {
      secret: REFRESH_TOKEN_SECRET,
      expiresIn: REFRESH_TOKEN_TTL,
    });

    findSessionByIdSpy.mockResolvedValue({
      id: 'session-1',
      userId: 'user-1',
      refreshToken,
      ttl: 1_700_000_000,
      expiresAt: '2026-04-08T00:00:00.000Z',
      createdAt: '2026-04-08T00:00:00.000Z',
      updatedAt: '2026-04-08T00:00:00.000Z',
    });

    const response = await fetch(`${baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });
    const body = (await response.json()) as RefreshSuccessResponse;
    const setCookieHeader = response.headers.get('set-cookie') ?? '';

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      statusCode: 200,
      data: {
        message: 'Refresh successful',
      },
    });
    expect(setCookieHeader).toContain('accessToken=');
    expect(setCookieHeader).toContain('refreshToken=');
    expect(setCookieHeader).toContain('Path=/auth');
    expect(findSessionByIdSpy).toHaveBeenCalledWith('session-1');
    expect(rotateSessionSpy).toHaveBeenCalledTimes(1);
  });

  it('POST /auth/refresh returns 401 when refresh token cookie is missing', async () => {
    const response = await fetch(`${baseUrl}/auth/refresh`, {
      method: 'POST',
    });
    const body = (await response.json()) as ErrorResponse;

    expect(response.status).toBe(401);
    expect(body.success).toBe(false);
    expect(body.statusCode).toBe(401);
    expect(body.message).toBe('Invalid refresh token');
    expect(body.path).toBe('/auth/refresh');
  });

  it('POST /auth/refresh returns 401 when refresh token is invalid', async () => {
    const response = await fetch(`${baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        cookie: 'refreshToken=invalid-token',
      },
    });
    const body = (await response.json()) as ErrorResponse;

    expect(response.status).toBe(401);
    expect(body.success).toBe(false);
    expect(body.statusCode).toBe(401);
    expect(body.message).toBe('Invalid refresh token');
    expect(body.path).toBe('/auth/refresh');
  });

  afterEach(async () => {
    jest.restoreAllMocks();

    if (app) {
      await app.close();
    }
  });
});
