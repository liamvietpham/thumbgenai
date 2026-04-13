import { ThumbnailJobStatus } from 'src/thumbnail-jobs/types/thumbnail-job-status.type';
import { CreateThumbnailDto } from 'src/thumbnails/dto/create-thumbnail.dto';

export type ThumbnailJobResult = {
  thumbnailId: string;
  imageUrl: string;
  provider: string;
  model: string;
};

export type ThumbnailJobError = {
  code: string;
  message: string;
  retryable: boolean;
  details?: Record<string, unknown>;
};

export type ThumbnailJob = {
  id: string;
  userId: string;
  status: ThumbnailJobStatus;
  payload: CreateThumbnailDto;
  result?: ThumbnailJobResult;
  error?: ThumbnailJobError;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
};
