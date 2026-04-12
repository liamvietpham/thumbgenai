import { UpdateThumbnailDto } from 'src/thumbnails/dto/update-thumbnail.dto';

export type UpdateThumbnailInput = {
  id: string;
  userId: string;
  visibility: UpdateThumbnailDto['visibility'];
};
