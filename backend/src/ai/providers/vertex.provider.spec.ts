import { ApiError, FinishReason, Modality } from '@google/genai';
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
      GOOGLE_CLOUD_TIMEOUT_MS: '20000',
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

  it('normalizes a successful image response and uses the default model', async () => {
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

    const result = await provider.generateImage({
      prompt: 'Create a thumbnail for NestJS queues',
      aspectRatio: '16:9',
    });

    expect(mockClient.models.generateContent).toHaveBeenCalledWith({
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
    });

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

  it('throws a 422 with block reason details when the prompt is blocked', async () => {
    mockClient.models.generateContent.mockResolvedValue({
      promptFeedback: {
        blockReason: 'PROHIBITED_CONTENT',
      },
      candidates: [],
    });

    try {
      await provider.generateImage({
        prompt: 'blocked prompt',
      });
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
      await provider.generateImage({
        prompt: 'unsafe prompt',
      });
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
      await provider.generateImage({
        prompt: 'unexpected provider response',
      });
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
      provider.generateImage({
        prompt: 'quota limited prompt',
      }),
    ).rejects.toThrow(BadGatewayException);

    await expect(
      provider.generateImage({
        prompt: 'quota limited prompt',
      }),
    ).rejects.toThrow('Vertex AI error: Quota exceeded');
  });

  it('maps AbortError to a timeout response', async () => {
    const abortError = new Error('request aborted');
    abortError.name = 'AbortError';
    mockClient.models.generateContent.mockRejectedValue(abortError);

    await expect(
      provider.generateImage({
        prompt: 'slow prompt',
      }),
    ).rejects.toThrow(BadGatewayException);

    await expect(
      provider.generateImage({
        prompt: 'slow prompt',
      }),
    ).rejects.toThrow('Vertex AI request timed out');
  });
});
