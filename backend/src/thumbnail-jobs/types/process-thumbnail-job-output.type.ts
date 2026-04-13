import { ThumbnailJobResult } from 'src/thumbnail-jobs/entities/thumbnail-job.entity';
import { Thumbnail } from 'src/thumbnails/entities/thumbnails.entity';

export type ProcessThumbnailJobOutput = {
  thumbnail: Thumbnail;
  jobResult: ThumbnailJobResult;
};
