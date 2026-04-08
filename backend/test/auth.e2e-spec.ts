import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { argon2id, hash } from 'argon2';
import { AuthService } from '../src/auth/auth.service';
import { createApp } from '../src/app.factory';
import { SessionRepository } from '../src/session/session.repository';
import { UsersRepository } from '../src/users/users.repository';

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

describe('AuthModule (e2e)', () => {
  let app: INestApplication;
  let baseUrl: string;

  beforeEach(async () => {
    process.env.NODE_ENV = 'test';
    process.env.AWS_REGION = 'ap-southeast-1';
    process.env.USERS_TABLE = 'users-test';
    process.env.SESSIONS_TABLE = 'sessions-test';
    process.env.ACCESS_TOKEN_SECRET = 'test-access-secret';
    process.env.REFRESH_TOKEN_SECRET = 'test-refresh-secret';
    process.env.ACCESS_TOKEN_TTL = '15m';
    process.env.REFRESH_TOKEN_TTL = '7d';
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
    const generateSessionIdSpy = jest
      .spyOn(
        AuthService.prototype as unknown as {
          generateSessionId: () => Promise<string>;
        },
        'generateSessionId',
      )
      .mockResolvedValue('session-1');

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
    expect(generateSessionIdSpy).toHaveBeenCalledTimes(1);
    expect(createSessionSpy).toHaveBeenCalledTimes(1);
  });

  it('POST /auth/logout revokes the session, clears cookies, and returns 200', async () => {
    const revokeSessionSpy = jest
      .spyOn(SessionRepository.prototype, 'revokeSession')
      .mockResolvedValue(undefined);
    const jwtService = app.get(JwtService);
    const refreshToken = jwtService.sign(
      {
        sub: 'user-1',
        email: 'john@example.com',
        sid: 'session-1',
        type: 'refresh',
      },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_TTL,
      },
    );

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

  it('POST /auth/logout returns 400 when refresh token cookie is missing', async () => {
    const response = await fetch(`${baseUrl}/auth/logout`, {
      method: 'POST',
    });
    const body = (await response.json()) as ErrorResponse;
    const setCookieHeader = response.headers.get('set-cookie') ?? '';

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.statusCode).toBe(400);
    expect(body.message).toBe('Refresh token is required');
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

  afterEach(async () => {
    jest.restoreAllMocks();

    if (app) {
      await app.close();
    }
  });
});
