import { INestApplication } from '@nestjs/common';
import { createApp } from '../src/app.factory';

type ErrorResponse = {
  success: boolean;
  statusCode: number;
  message: string | string[];
  path: string;
};

describe('AuthModule (e2e)', () => {
  let app: INestApplication;
  let baseUrl: string;

  beforeEach(async () => {
    app = await createApp();
    await app.listen(0);
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

  afterEach(async () => {
    await app.close();
  });
});
