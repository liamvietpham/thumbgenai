import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createApp } from '../src/app.factory';
import { AccessTokenPayload } from '../src/auth/types/jwt-payload.type';
import { ThumbnailJobsService } from '../src/thumbnail-jobs/thumbnail-jobs.service';
import { ThumbnailsService } from '../src/thumbnails/thumbnails.service';
import { setupTestEnv, TEST_ACCESS_TOKEN_SECRET, TEST_ACCESS_TOKEN_TTL } from './setup-test-env';

type ErrorResponse = {
  success: boolean;
  statusCode: number;
  message: string | string[];
  path: string;
  timestamp: string;
};

type SuccessResponse<T> = {
  success: boolean;
  statusCode: number;
  data: T;
};

describe('ThumbnailsModule (e2e)', () => {
  let app: INestApplication;
  let baseUrl: string;
  let createJobSpy: jest.SpiedFunction<typeof ThumbnailJobsService.prototype.createJob>;
  let getJobSpy: jest.SpiedFunction<typeof ThumbnailJobsService.prototype.getJob>;
  let updateThumbnailSpy: jest.SpiedFunction<typeof ThumbnailsService.prototype.updateThumbnail>;

  beforeAll(async () => {
    setupTestEnv();
    app = await createApp();
    await app.listen(0, '127.0.0.1');
    baseUrl = await app.getUrl();
  });

  beforeEach(() => {
    createJobSpy = jest.spyOn(ThumbnailJobsService.prototype, 'createJob').mockResolvedValue({
      jobId: 'job-1',
      status: 'QUEUED'
    });
    getJobSpy = jest.spyOn(ThumbnailJobsService.prototype, 'getJob').mockResolvedValue({
      id: 'job-1',
      status: 'PROCESSING',
      result: undefined,
      error: undefined,
      createdAt: '2026-04-12T00:00:00.000Z',
      updatedAt: '2026-04-12T00:00:05.000Z',
      completedAt: undefined
    });
    updateThumbnailSpy = jest
      .spyOn(ThumbnailsService.prototype, 'updateThumbnail')
      .mockResolvedValue({
        id: 'thumbnail-1',
        userId: 'user-1',
        visibility: 'public',
        updatedAt: '2026-04-12T00:00:00.000Z'
      });
  });

  const createAccessTokenCookie = () => {
    const jwtService = app.get(JwtService);
    const payload: AccessTokenPayload = {
      sub: 'user-1',
      email: 'john@example.com',
      sid: 'session-1',
      type: 'access'
    };
    const accessToken = jwtService.sign(payload, {
      secret: TEST_ACCESS_TOKEN_SECRET,
      expiresIn: TEST_ACCESS_TOKEN_TTL
    });

    return `accessToken=${accessToken}`;
  };

  it('POST /thumbnails returns 401 when the access token cookie is missing', async () => {
    const response = await fetch(`${baseUrl}/thumbnails`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Top smartwatch',
        prompt: 'make it bold',
        style: 'bold_and_graphic',
        aspectRatio: '16:9',
        colorScheme: 'vibrant'
      })
    });
    const body = (await response.json()) as ErrorResponse;

    expect(response.status).toBe(401);
    expect(body.success).toBe(false);
    expect(body.statusCode).toBe(401);
    expect(body.message).toBe('Invalid token');
    expect(body.path).toBe('/thumbnails');
    expect(body.timestamp).toEqual(expect.any(String));
    expect(createJobSpy).not.toHaveBeenCalled();
  });

  it('POST /thumbnails validates the request body before calling the service', async () => {
    const response = await fetch(`${baseUrl}/thumbnails`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        cookie: createAccessTokenCookie()
      },
      body: JSON.stringify({
        title: 'Top smartwatch',
        prompt: 'make it bold',
        style: 'bold_and_graphic',
        aspectRatio: '16:9'
      })
    });
    const body = (await response.json()) as ErrorResponse;

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.statusCode).toBe(400);
    expect(body.message).toEqual(['colorScheme should not be empty']);
    expect(body.path).toBe('/thumbnails');
    expect(createJobSpy).not.toHaveBeenCalled();
  });

  it('POST /thumbnails returns queued job metadata and forwards the authenticated user id', async () => {
    const payload = {
      title: 'Top smartwatch',
      prompt: 'make it bold',
      style: 'bold_and_graphic',
      aspectRatio: '16:9',
      colorScheme: 'vibrant'
    };

    const response = await fetch(`${baseUrl}/thumbnails`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        cookie: createAccessTokenCookie()
      },
      body: JSON.stringify(payload)
    });
    const body = (await response.json()) as SuccessResponse<{
      jobId: string;
      status: string;
    }>;

    expect(response.status).toBe(201);
    expect(body.success).toBe(true);
    expect(body.statusCode).toBe(201);
    expect(body.data).toEqual({
      jobId: 'job-1',
      status: 'QUEUED'
    });
    expect(createJobSpy).toHaveBeenCalledWith(payload, 'user-1');
  });

  it('GET /thumbnail-jobs/:jobId returns the current job state', async () => {
    const response = await fetch(`${baseUrl}/thumbnail-jobs/job-1`, {
      method: 'GET',
      headers: {
        cookie: createAccessTokenCookie()
      }
    });
    const body = (await response.json()) as SuccessResponse<{
      id: string;
      status: string;
      result?: unknown;
      error?: unknown;
      createdAt: string;
      updatedAt?: string;
      completedAt?: string;
    }>;

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.statusCode).toBe(200);
    expect(body.data).toEqual({
      id: 'job-1',
      status: 'PROCESSING',
      result: undefined,
      error: undefined,
      createdAt: '2026-04-12T00:00:00.000Z',
      updatedAt: '2026-04-12T00:00:05.000Z',
      completedAt: undefined
    });
    expect(getJobSpy).toHaveBeenCalledWith('job-1', 'user-1');
  });

  it('POST /thumbnails/:id validates visibility updates and forwards ownership context', async () => {
    const response = await fetch(`${baseUrl}/thumbnails/thumbnail-1`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        cookie: createAccessTokenCookie()
      },
      body: JSON.stringify({
        visibility: 'public'
      })
    });
    const body = (await response.json()) as SuccessResponse<{
      id: string;
      userId: string;
      visibility: string;
    }>;

    expect(response.status).toBe(201);
    expect(body.success).toBe(true);
    expect(body.statusCode).toBe(201);
    expect(body.data).toEqual({
      id: 'thumbnail-1',
      userId: 'user-1',
      visibility: 'public',
      updatedAt: '2026-04-12T00:00:00.000Z'
    });
    expect(updateThumbnailSpy).toHaveBeenCalledWith(
      { visibility: 'public' },
      'thumbnail-1',
      'user-1'
    );
  });

  it('POST /thumbnails/:id rejects invalid visibility values', async () => {
    const response = await fetch(`${baseUrl}/thumbnails/thumbnail-1`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        cookie: createAccessTokenCookie()
      },
      body: JSON.stringify({
        visibility: 'hidden'
      })
    });
    const body = (await response.json()) as ErrorResponse;

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.statusCode).toBe(400);
    expect(body.message).toEqual(['visibility must be one of the following values: ']);
    expect(body.path).toBe('/thumbnails/thumbnail-1');
    expect(updateThumbnailSpy).not.toHaveBeenCalled();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
});
