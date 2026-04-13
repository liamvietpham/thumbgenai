import {
  ApiError,
  FinishReason,
  GenerateContentParameters,
  GenerateContentResponse,
  GoogleGenAI,
  Modality
} from '@google/genai';
import {
  BadGatewayException,
  Injectable,
  Logger,
  UnprocessableEntityException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GenerateImageResult } from 'src/ai/types/generate-image-result.type';

@Injectable()
export class VertexProvider {
  private readonly logger = new Logger(VertexProvider.name);
  private readonly client: GoogleGenAI;
  private readonly projectId: string;
  private readonly location: string;
  private readonly timeoutMs: number;
  private readonly gcpServiceAccountKey: string;

  constructor(private readonly configService: ConfigService) {
    this.projectId = this.configService.getOrThrow<string>('GOOGLE_CLOUD_PROJECT');
    this.location = this.configService.getOrThrow<string>('GOOGLE_CLOUD_LOCATION');
    this.timeoutMs = Number(this.configService.getOrThrow<string>('VERTEX_AI_TIMEOUT_MS'));
    this.gcpServiceAccountKey = this.configService.getOrThrow<string>('GCP_SERVICE_ACCOUNT_KEY');

    this.client = new GoogleGenAI({
      vertexai: true,
      project: this.projectId,
      location: this.location,
      googleAuthOptions: {
        credentials: JSON.parse(this.gcpServiceAccountKey) as Record<string, string>
      }
    });
  }

  async generateImage(params: GenerateContentParameters): Promise<GenerateImageResult> {
    try {
      const response = await this.client.models.generateContent({
        ...params,
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
          ...params.config,
          httpOptions: {
            timeout: this.timeoutMs,
            ...params.config?.httpOptions
          }
        }
      });

      const candidate = response.candidates?.[0];
      const parts = candidate?.content?.parts ?? [];

      const text =
        parts
          .filter((part) => Boolean(part.text))
          .map((part) => part.text!.trim())
          .join('\n') || null;

      const images = parts
        .filter((part) => Boolean(part.inlineData?.data))
        .map((part) => ({
          mimeType: part.inlineData?.mimeType ?? 'image/png',
          base64: part.inlineData?.data ?? ''
        }));

      if (!images.length) {
        this.throwNoImageReason(response);
      }

      return {
        provider: 'vertex',
        model: params.model,
        text,
        images
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw new BadGatewayException(`Vertex AI error: ${error.message}`);
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new BadGatewayException('Vertex AI request timed out');
      }

      throw error;
    }
  }

  private throwNoImageReason(response: GenerateContentResponse): never {
    const candidate = response.candidates?.[0];
    const blockReason = response.promptFeedback?.blockReason;
    const finishReason = candidate?.finishReason;
    const finishMessage = candidate?.finishMessage;
    const safetyRatings = candidate?.safetyRatings ?? [];

    if (blockReason) {
      throw new UnprocessableEntityException({
        message: `Vertex AI blocked the prompt: ${blockReason}`,
        details: {
          provider: 'vertex',
          blockReason,
          finishReason,
          finishMessage,
          safetyRatings
        }
      });
    }

    const userInputRelatedReasons = new Set<FinishReason>([
      FinishReason.SAFETY,
      FinishReason.BLOCKLIST,
      FinishReason.PROHIBITED_CONTENT,
      FinishReason.SPII,
      FinishReason.RECITATION,
      FinishReason.LANGUAGE
    ]);

    if (finishReason && userInputRelatedReasons.has(finishReason)) {
      throw new UnprocessableEntityException({
        message: finishMessage
          ? `Vertex AI stopped generation: ${finishReason} - ${finishMessage}`
          : `Vertex AI stopped generation: ${finishReason}`,
        details: {
          provider: 'vertex',
          finishReason,
          finishMessage,
          safetyRatings
        }
      });
    }

    throw new BadGatewayException({
      message: finishMessage
        ? `Vertex AI returned no images: ${finishReason ?? 'UNKNOWN'} - ${finishMessage}`
        : 'Vertex AI returned no images',
      details: {
        provider: 'vertex',
        finishReason,
        finishMessage,
        safetyRatings
      }
    });
  }
}
