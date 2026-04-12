import {
  ApiError,
  FinishReason,
  GenerateContentParameters,
  Modality,
} from '@google/genai';
import {
  BadGatewayException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VertexProvider } from './vertex.provider';

type MockClient = {
  models: {
    generateContent: jest.Mock;
  };
};

describe('VertexProvider', () => {
  let provider: VertexProvider;
  let configService: Pick<ConfigService, 'getOrThrow'>;
  let mockClient: MockClient;

  beforeEach(() => {
    const configMap: Record<string, string> = {
      GOOGLE_CLOUD_PROJECT: 'thumbgen-test',
      GOOGLE_CLOUD_LOCATION: 'global',
      VERTEX_AI_TIMEOUT_MS: '20000',
      GCP_SERVICE_ACCOUNT_KEY: JSON.stringify({
        type: 'service_account',
        project_id: 'thumbgen-test',
        private_key_id: 'test-private-key-id',
        private_key:
          '-----BEGIN PRIVATE KEY-----\nTEST\n-----END PRIVATE KEY-----\n',
        client_email: 'vertex@test.iam.gserviceaccount.com',
        client_id: 'test-client-id',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url:
          'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: 'https://example.com/cert',
      }),
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

    provider = new VertexProvider(configService as ConfigService);
    mockClient = {
      models: {
        generateContent: jest.fn(),
      },
    };

    (provider as unknown as { client: MockClient }).client = mockClient;
  });

  const buildParams = (
    overrides: Partial<GenerateContentParameters> = {},
  ): GenerateContentParameters =>
    ({
      model: 'gemini-2.5-flash-image',
      contents: 'Create a thumbnail for NestJS queues',
      ...overrides,
    }) as GenerateContentParameters;

  it('normalizes a successful image response', async () => {
    mockClient.models.generateContent.mockResolvedValue({
      candidates: [
        {
          content: {
            parts: [
              { text: 'Thumbnail ready' },
              {
                inlineData: {
                  mimeType: 'image/png',
                  data: 'base64-image',
                },
              },
            ],
          },
        },
      ],
    });

    const result = await provider.generateImage(
      buildParams({
        config: {
          imageConfig: {
            aspectRatio: '16:9',
          },
        },
      }),
    );

    expect(mockClient.models.generateContent).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'gemini-2.5-flash-image',
        contents: 'Create a thumbnail for NestJS queues',
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
          imageConfig: {
            aspectRatio: '16:9',
          },
          httpOptions: {
            timeout: 20_000,
          },
        },
      }),
    );

    expect(result).toEqual({
      provider: 'vertex',
      model: 'gemini-2.5-flash-image',
      text: 'Thumbnail ready',
      images: [
        {
          mimeType: 'image/png',
          base64: 'base64-image',
        },
      ],
    });
  });

  it('merges caller config with the provider defaults', async () => {
    mockClient.models.generateContent.mockResolvedValue({
      candidates: [
        {
          content: {
            parts: [
              {
                inlineData: {
                  mimeType: 'image/png',
                  data: 'base64-image',
                },
              },
            ],
          },
        },
      ],
    });

    await provider.generateImage(
      buildParams({
        model: 'custom-image-model',
        config: {
          temperature: 0.8,
          responseModalities: [Modality.IMAGE],
          imageConfig: {
            aspectRatio: '1:1',
            imageSize: '1K',
          },
          httpOptions: {
            timeout: 15_000,
          },
        },
      }),
    );

    expect(mockClient.models.generateContent).toHaveBeenCalledWith({
      model: 'custom-image-model',
      contents: 'Create a thumbnail for NestJS queues',
      config: {
        temperature: 0.8,
        responseModalities: [Modality.IMAGE],
        imageConfig: {
          aspectRatio: '1:1',
          imageSize: '1K',
        },
        httpOptions: {
          timeout: 15_000,
        },
      },
    });
  });

  it('throws a 422 with block reason details when the prompt is blocked', async () => {
    mockClient.models.generateContent.mockResolvedValue({
      promptFeedback: {
        blockReason: 'PROHIBITED_CONTENT',
      },
      candidates: [],
    });

    try {
      await provider.generateImage(buildParams({ contents: 'blocked prompt' }));
      throw new Error('Expected generateImage to throw');
    } catch (error) {
      expect(error).toBeInstanceOf(UnprocessableEntityException);

      const response = (
        error as UnprocessableEntityException
      ).getResponse() as {
        message: string;
        details: {
          provider: string;
          blockReason: string;
        };
      };

      expect(response).toEqual({
        message: 'Vertex AI blocked the prompt: PROHIBITED_CONTENT',
        details: {
          provider: 'vertex',
          blockReason: 'PROHIBITED_CONTENT',
          finishReason: undefined,
          finishMessage: undefined,
          safetyRatings: [],
        },
      });
    }
  });

  it('throws a 422 with finish reason details when generation is stopped by safety policies', async () => {
    mockClient.models.generateContent.mockResolvedValue({
      candidates: [
        {
          finishReason: FinishReason.SAFETY,
          finishMessage: 'Image request triggered safety filters',
          safetyRatings: [{ category: 'HARM_CATEGORY_DANGEROUS_CONTENT' }],
          content: {
            parts: [],
          },
        },
      ],
    });

    try {
      await provider.generateImage(buildParams({ contents: 'unsafe prompt' }));
      throw new Error('Expected generateImage to throw');
    } catch (error) {
      expect(error).toBeInstanceOf(UnprocessableEntityException);

      const response = (
        error as UnprocessableEntityException
      ).getResponse() as {
        message: string;
        details: {
          provider: string;
          finishReason: FinishReason;
          finishMessage: string;
          safetyRatings: Array<{ category: string }>;
        };
      };

      expect(response).toEqual({
        message:
          'Vertex AI stopped generation: SAFETY - Image request triggered safety filters',
        details: {
          provider: 'vertex',
          finishReason: FinishReason.SAFETY,
          finishMessage: 'Image request triggered safety filters',
          safetyRatings: [{ category: 'HARM_CATEGORY_DANGEROUS_CONTENT' }],
        },
      });
    }
  });

  it('throws a 502 when Vertex returns no images without a user-fixable reason', async () => {
    mockClient.models.generateContent.mockResolvedValue({
      candidates: [
        {
          finishReason: FinishReason.OTHER,
          finishMessage: 'No image parts were returned',
          content: {
            parts: [{ text: 'No image generated' }],
          },
        },
      ],
    });

    try {
      await provider.generateImage(
        buildParams({ contents: 'unexpected provider response' }),
      );
      throw new Error('Expected generateImage to throw');
    } catch (error) {
      expect(error).toBeInstanceOf(BadGatewayException);

      const response = (error as BadGatewayException).getResponse() as {
        message: string;
        details: {
          provider: string;
          finishReason: FinishReason;
          finishMessage: string;
        };
      };

      expect(response).toEqual({
        message:
          'Vertex AI returned no images: OTHER - No image parts were returned',
        details: {
          provider: 'vertex',
          finishReason: FinishReason.OTHER,
          finishMessage: 'No image parts were returned',
          safetyRatings: [],
        },
      });
    }
  });

  it('maps ApiError to BadGatewayException', async () => {
    mockClient.models.generateContent.mockRejectedValue(
      new ApiError({
        status: 429,
        message: 'Quota exceeded',
      }),
    );

    await expect(
      provider.generateImage(buildParams({ contents: 'quota limited prompt' })),
    ).rejects.toThrow(BadGatewayException);

    await expect(
      provider.generateImage(buildParams({ contents: 'quota limited prompt' })),
    ).rejects.toThrow('Vertex AI error: Quota exceeded');
  });

  it('maps AbortError to a timeout response', async () => {
    const abortError = new Error('request aborted');
    abortError.name = 'AbortError';
    mockClient.models.generateContent.mockRejectedValue(abortError);

    await expect(
      provider.generateImage(buildParams({ contents: 'slow prompt' })),
    ).rejects.toThrow(BadGatewayException);

    await expect(
      provider.generateImage(buildParams({ contents: 'slow prompt' })),
    ).rejects.toThrow('Vertex AI request timed out');
  });
});
