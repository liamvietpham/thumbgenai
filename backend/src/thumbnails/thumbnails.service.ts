import { BadGatewayException, Injectable } from '@nestjs/common';
import { generateFileName } from 'src/common/utils/file-name.util';
import { VertexProvider } from 'src/ai/providers/vertex.provider';
import { S3Service } from 'src/s3/s3.service';
import { CreateThumbnailDto } from 'src/thumbnails/dto/create-thumbnail.dto';
import {
  COLOR_SCHEME_DESCRIPTIONS,
  STYLE_PROMPTS,
  THUMBNAIL_GENERATION_CONFIG,
  THUMBNAIL_MODEL,
} from 'src/thumbnails/constants/thumbnails.constant';
import { THUMBNAIL_UPLOAD_FOLDER } from 'src/s3/constants/s3.constant';
import { ThumbnailsRepository } from 'src/thumbnails/thumbnails.repository';
import { CreateThumbnailInput } from 'src/thumbnails/types/create-thumbnail-input.type';
import { generateId } from 'src/common/utils/id.util';
import { UpdateThumbnailDto } from 'src/thumbnails/dto/update-thumbnail.dto';

@Injectable()
export class ThumbnailsService {
  constructor(
    private readonly vertexProvider: VertexProvider,
    private readonly s3Service: S3Service,
    private readonly thumbnailsRepository: ThumbnailsRepository,
  ) {}

  async createThumbnail(payload: CreateThumbnailDto, userId: string) {
    const enhancedPrompt = this.buildPrompt(payload);

    const response = await this.vertexProvider.generateImage({
      contents: enhancedPrompt,
      model: THUMBNAIL_MODEL,
      config: {
        ...THUMBNAIL_GENERATION_CONFIG,
        imageConfig: {
          aspectRatio: payload.aspectRatio || '16:9',
          imageSize: '1K',
        },
      },
    });

    const image = response.images?.[0];

    if (!image?.base64 || !image?.mimeType) {
      throw new BadGatewayException(
        'Vertex AI returned an invalid image payload',
      );
    }

    const buffer = Buffer.from(image.base64, 'base64');
    const fileName = generateFileName(payload.title, image.mimeType);

    const imageUrl = await this.s3Service.uploadFile({
      file: buffer,
      fileName,
      contentType: image.mimeType,
      folderName: THUMBNAIL_UPLOAD_FOLDER,
    });

    const thumbnailId = await generateId();
    const createThumbnailInput: CreateThumbnailInput = {
      id: thumbnailId,
      userId,
      title: payload.title,
      prompt: payload.prompt,
      promptUsed: enhancedPrompt,
      style: payload.style,
      aspectRatio: payload.aspectRatio,
      colorScheme: payload.colorScheme,
      provider: 'vertex',
      model: THUMBNAIL_MODEL,
      imageUrl,
    };

    const thumbnail =
      await this.thumbnailsRepository.createThumbnail(createThumbnailInput);

    return thumbnail;
  }

  async updateThumbnail(
    payload: UpdateThumbnailDto,
    thumbnailId: string,
    userId: string,
  ) {
    return await this.thumbnailsRepository.updateThumbnail({
      ...payload,
      id: thumbnailId,
      userId,
    });
  }

  private buildPrompt(payload: CreateThumbnailDto) {
    const { title, prompt, style, colorScheme } = payload;

    return `
Create a highly clickable YouTube thumbnail.

Main subject:
${prompt || `A thumbnail concept centered on "${title}"`}, expressive, dramatic, attention-grabbing

Text on image:
"${title}", large bold typography, centered, high contrast, easy to read

Style:
${STYLE_PROMPTS[style]}

Color:
${COLOR_SCHEME_DESCRIPTIONS[colorScheme]}

Composition:
- strong focal point
- emotional impact
- high contrast
- cinematic lighting

Make it viral, eye-catching, and optimized for high CTR.
`;
  }
}
