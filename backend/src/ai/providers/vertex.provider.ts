import {
  ApiError,
  FinishReason,
  GenerateContentResponse,
  GoogleGenAI,
  Modality,
} from '@google/genai';
import {
  BadGatewayException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GenerateImageInput } from 'src/ai/types/generate-image-input.type';
import { GenerateImageResult } from 'src/ai/types/generate-image-result.type';

@Injectable()
export class VertexProvider {
  private readonly client: GoogleGenAI;
  private readonly projectId: string;
  private readonly location: string;
  private readonly timeoutMs: number;

  constructor(private readonly configService: ConfigService) {
    this.projectId = this.configService.getOrThrow<string>(
      'GOOGLE_CLOUD_PROJECT',
    );
    this.location = this.configService.getOrThrow<string>(
      'GOOGLE_CLOUD_LOCATION',
    );
    this.timeoutMs = Number(
      this.configService.getOrThrow<string>('GOOGLE_CLOUD_TIMEOUT_MS'),
    );

    this.client = new GoogleGenAI({
      vertexai: true,
      project: this.projectId,
      location: this.location,
      apiVersion: 'v1',
    });
  }

  async generateImage(
    payload: GenerateImageInput,
  ): Promise<GenerateImageResult> {
    const { prompt, aspectRatio, model } = payload;
    const resolvedModel = model ?? 'gemini-2.5-flash-image';

    try {
      const response = await this.client.models.generateContent({
        model: resolvedModel,
        contents: prompt,
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
          imageConfig: {
            ...(aspectRatio ? { aspectRatio } : {}),
          },
          httpOptions: {
            timeout: this.timeoutMs,
          },
        },
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
          base64: part.inlineData?.data ?? '',
        }));

      if (!images.length) {
        this.throwNoImageReason(response);
      }

      return {
        provider: 'vertex',
        model: resolvedModel,
        text,
        images,
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
          safetyRatings,
        },
      });
    }

    const userInputRelatedReasons = new Set<FinishReason>([
      FinishReason.SAFETY,
      FinishReason.BLOCKLIST,
      FinishReason.PROHIBITED_CONTENT,
      FinishReason.SPII,
      FinishReason.RECITATION,
      FinishReason.LANGUAGE,
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
          safetyRatings,
        },
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
        safetyRatings,
      },
    });
  }
}
