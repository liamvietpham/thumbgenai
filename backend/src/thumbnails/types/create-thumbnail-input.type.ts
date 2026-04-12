import { CreateThumbnailDto } from 'src/thumbnails/dto/create-thumbnail.dto';

export type CreateThumbnailInput = {
  id: string;
  userId: string;
  title: string;
  prompt?: string;
  promptUsed: string;
  style: CreateThumbnailDto['style'];
  aspectRatio: CreateThumbnailDto['aspectRatio'];
  colorScheme: CreateThumbnailDto['colorScheme'];
  provider: string;
  model: string;
  imageUrl: string;
};
