import { CreateThumbnailDto } from 'src/thumbnails/dto/create-thumbnail.dto';

export type CreateThumbnailJobInput = {
  id: string;
  userId: string;
  payload: CreateThumbnailDto;
  status: 'QUEUED';
};
