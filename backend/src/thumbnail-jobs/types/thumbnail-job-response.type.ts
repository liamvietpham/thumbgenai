import {
  ThumbnailJobError,
  ThumbnailJobResult
} from 'src/thumbnail-jobs/entities/thumbnail-job.entity';
import { ThumbnailJobStatus } from 'src/thumbnail-jobs/types/thumbnail-job-status.type';

export type ThumbnailJobResponse = {
  id: string;
  status: ThumbnailJobStatus;
  result?: ThumbnailJobResult;
  error?: ThumbnailJobError;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
};
