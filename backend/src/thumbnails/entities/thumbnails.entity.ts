import { CreateThumbnailDto } from 'src/thumbnails/dto/create-thumbnail.dto';

export type Thumbnail = {
  id: string;
  userId: string;
  title: string;
  prompt?: string;
  promptUsed: string;
  style: CreateThumbnailDto['style'];
  aspectRatio: CreateThumbnailDto['aspectRatio'];
  colorScheme: CreateThumbnailDto['colorScheme'];
  provider: string;
  visibility: 'public' | 'private' | 'deleted';
  model: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
};
