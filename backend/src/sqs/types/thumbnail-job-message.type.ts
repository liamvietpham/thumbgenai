import { CreateThumbnailDto } from 'src/thumbnails/dto/create-thumbnail.dto';

export type ThumbnailJobMessage = {
  id: string;
  userId: string;
  payload: CreateThumbnailDto;
};
