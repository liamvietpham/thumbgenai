import { INestApplication } from '@nestjs/common';
import { createApp } from '../src/app.factory';

type HealthResponse = {
  success: boolean;
  statusCode: number;
  data: {
    status: string;
    service: string;
  };
};

describe('HealthController (e2e)', () => {
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

  it('GET /health returns wrapped success metadata', async () => {
    const response = await fetch(`${baseUrl}/health`);
    const body = (await response.json()) as HealthResponse;

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      statusCode: 200,
      data: {
        status: 'ok',
        service: 'thumbgen-ai-backend',
      },
    });
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });
});
