import { INestApplication } from '@nestjs/common';
import { createApp } from '../src/app.factory';

type HealthResponse = {
  status: string;
  service: string;
};

describe('HealthController (e2e)', () => {
  let app: INestApplication;
  let baseUrl: string;

  beforeEach(async () => {
    app = await createApp();
    await app.listen(0);
    baseUrl = await app.getUrl();
  });

  it('GET /health returns service metadata', async () => {
    const response = await fetch(`${baseUrl}/health`);
    const body = (await response.json()) as HealthResponse;

    expect(response.status).toBe(200);
    expect(body).toEqual({
      status: 'ok',
      service: 'thumbgen-ai-backend',
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
