import { CreateThumbnailDto } from 'src/thumbnails/dto/create-thumbnail.dto';

export type ProcessThumbnailJobInput = {
  id: string;
  userId: string;
  payload: CreateThumbnailDto;
};
