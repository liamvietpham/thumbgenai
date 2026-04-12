import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createApp } from '../src/app.factory';
import { AccessTokenPayload } from '../src/auth/types/jwt-payload.type';
import { ThumbnailsService } from '../src/thumbnails/thumbnails.service';

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

const ACCESS_TOKEN_SECRET = 'test-access-secret';
const REFRESH_TOKEN_SECRET = 'test-refresh-secret';
const ACCESS_TOKEN_TTL = '15m';
const REFRESH_TOKEN_TTL = '7d';

describe('ThumbnailsModule (e2e)', () => {
  let app: INestApplication;
  let baseUrl: string;
  let createThumbnailSpy: jest.SpiedFunction<
    typeof ThumbnailsService.prototype.createThumbnail
  >;
  let updateThumbnailSpy: jest.SpiedFunction<
    typeof ThumbnailsService.prototype.updateThumbnail
  >;

  const serviceAccountJson = JSON.stringify({
    type: 'service_account',
    project_id: 'thumbgen-test',
    private_key_id: 'test-private-key-id',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nTEST\n-----END PRIVATE KEY-----\n',
    client_email: 'vertex@test.iam.gserviceaccount.com',
    client_id: 'test-client-id',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: 'https://example.com/cert',
  });

  beforeEach(async () => {
    process.env.NODE_ENV = 'test';
    process.env.AWS_REGION = 'ap-southeast-1';
    process.env.AWS_ACCESS_KEY_ID = 'test-access-key';
    process.env.AWS_SECRET_ACCESS_KEY = 'test-secret-key';
    process.env.AWS_BUCKET_NAME = 'thumbgen-bucket';
    process.env.AWS_CLOUDFRONT_DOMAIN = 'https://cdn.example.com';
    process.env.USERS_TABLE = 'users-test';
    process.env.SESSIONS_TABLE = 'sessions-test';
    process.env.THUMBNAILS_TABLE = 'thumbnails-test';
    process.env.ACCESS_TOKEN_SECRET = ACCESS_TOKEN_SECRET;
    process.env.REFRESH_TOKEN_SECRET = REFRESH_TOKEN_SECRET;
    process.env.ACCESS_TOKEN_TTL = ACCESS_TOKEN_TTL;
    process.env.REFRESH_TOKEN_TTL = REFRESH_TOKEN_TTL;
    process.env.CORS_ORIGIN = 'http://localhost:3000';
    process.env.GOOGLE_CLOUD_PROJECT = 'thumbgen-test';
    process.env.GOOGLE_CLOUD_LOCATION = 'global';
    process.env.VERTEX_AI_TIMEOUT_MS = '20000';
    process.env.GCP_SERVICE_ACCOUNT_KEY = serviceAccountJson;

    createThumbnailSpy = jest
      .spyOn(ThumbnailsService.prototype, 'createThumbnail')
      .mockResolvedValue({
        id: 'thumbnail-1',
        userId: 'user-1',
        title: 'Top smartwatch',
        prompt: 'make it bold',
        promptUsed: 'prompt used',
        style: 'bold_and_graphic',
        aspectRatio: '16:9',
        colorScheme: 'vibrant',
        provider: 'vertex',
        model: 'gemini-2.5-flash-image',
        imageUrl: 'https://cdn.example.com/generated-images/thumb.png',
        visibility: 'private',
        createdAt: '2026-04-12T00:00:00.000Z',
      });
    updateThumbnailSpy = jest
      .spyOn(ThumbnailsService.prototype, 'updateThumbnail')
      .mockResolvedValue({
        id: 'thumbnail-1',
        userId: 'user-1',
        visibility: 'public',
        updatedAt: '2026-04-12T00:00:00.000Z',
      });

    app = await createApp();
    await app.listen(0, '127.0.0.1');
    baseUrl = await app.getUrl();
  });

  const createAccessTokenCookie = () => {
    const jwtService = app.get(JwtService);
    const payload: AccessTokenPayload = {
      sub: 'user-1',
      email: 'john@example.com',
      sid: 'session-1',
      type: 'access',
    };
    const accessToken = jwtService.sign(payload, {
      secret: ACCESS_TOKEN_SECRET,
      expiresIn: ACCESS_TOKEN_TTL,
    });

    return `accessToken=${accessToken}`;
  };

  it('POST /thumbnails returns 401 when the access token cookie is missing', async () => {
    const response = await fetch(`${baseUrl}/thumbnails`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Top smartwatch',
        prompt: 'make it bold',
        style: 'bold_and_graphic',
        aspectRatio: '16:9',
        colorScheme: 'vibrant',
      }),
    });
    const body = (await response.json()) as ErrorResponse;

    expect(response.status).toBe(401);
    expect(body.success).toBe(false);
    expect(body.statusCode).toBe(401);
    expect(body.message).toBe('Invalid token');
    expect(body.path).toBe('/thumbnails');
    expect(body.timestamp).toEqual(expect.any(String));
    expect(createThumbnailSpy).not.toHaveBeenCalled();
  });

  it('POST /thumbnails validates the request body before calling the service', async () => {
    const response = await fetch(`${baseUrl}/thumbnails`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        cookie: createAccessTokenCookie(),
      },
      body: JSON.stringify({
        title: 'Top smartwatch',
        prompt: 'make it bold',
        style: 'bold_and_graphic',
        aspectRatio: '16:9',
      }),
    });
    const body = (await response.json()) as ErrorResponse;

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.statusCode).toBe(400);
    expect(body.message).toEqual(['colorScheme should not be empty']);
    expect(body.path).toBe('/thumbnails');
    expect(createThumbnailSpy).not.toHaveBeenCalled();
  });

  it('POST /thumbnails passes the authenticated user id to the service', async () => {
    const payload = {
      title: 'Top smartwatch',
      prompt: 'make it bold',
      style: 'bold_and_graphic',
      aspectRatio: '16:9',
      colorScheme: 'vibrant',
    };

    const response = await fetch(`${baseUrl}/thumbnails`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        cookie: createAccessTokenCookie(),
      },
      body: JSON.stringify(payload),
    });
    const body = (await response.json()) as SuccessResponse<{
      id: string;
      userId: string;
      visibility: string;
    }>;

    expect(response.status).toBe(201);
    expect(body.success).toBe(true);
    expect(body.statusCode).toBe(201);
    expect(body.data).toMatchObject({
      id: 'thumbnail-1',
      userId: 'user-1',
      visibility: 'private',
    });
    expect(createThumbnailSpy).toHaveBeenCalledWith(payload, 'user-1');
  });

  it('POST /thumbnails/:id validates visibility updates and forwards ownership context', async () => {
    const response = await fetch(`${baseUrl}/thumbnails/thumbnail-1`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        cookie: createAccessTokenCookie(),
      },
      body: JSON.stringify({
        visibility: 'public',
      }),
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
      updatedAt: '2026-04-12T00:00:00.000Z',
    });
    expect(updateThumbnailSpy).toHaveBeenCalledWith(
      { visibility: 'public' },
      'thumbnail-1',
      'user-1',
    );
  });

  it('POST /thumbnails/:id rejects invalid visibility values', async () => {
    const response = await fetch(`${baseUrl}/thumbnails/thumbnail-1`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        cookie: createAccessTokenCookie(),
      },
      body: JSON.stringify({
        visibility: 'hidden',
      }),
    });
    const body = (await response.json()) as ErrorResponse;

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.statusCode).toBe(400);
    expect(body.message).toEqual([
      'visibility must be one of the following values: ',
    ]);
    expect(body.path).toBe('/thumbnails/thumbnail-1');
    expect(updateThumbnailSpy).not.toHaveBeenCalled();
  });

  afterEach(async () => {
    jest.restoreAllMocks();

    if (app) {
      await app.close();
    }
  });
});
