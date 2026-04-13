import { Injectable, NotFoundException } from '@nestjs/common';
import { generateId } from 'src/common/utils/id.util';
import { SqsService } from 'src/sqs/sqs.service';
import { ThumbnailJobsRepository } from 'src/thumbnail-jobs/thumbnail-jobs.repository';
import { CreateThumbnailJobInput } from 'src/thumbnail-jobs/types/create-thumbnail-job-input.type';
import { ThumbnailJobResponse } from 'src/thumbnail-jobs/types/thumbnail-job-response.type';
import { CreateThumbnailDto } from 'src/thumbnails/dto/create-thumbnail.dto';

@Injectable()
export class ThumbnailJobsService {
  constructor(
    private readonly thumbnailJobsRepository: ThumbnailJobsRepository,
    private readonly sqsService: SqsService,
  ) {}

  async createJob(payload: CreateThumbnailDto, userId: string) {
    const id = await generateId();
    const job: CreateThumbnailJobInput = {
      id,
      userId,
      payload,
      status: 'QUEUED',
    };

    await this.thumbnailJobsRepository.createJob(job);

    await this.sqsService.sendMessage({
      id,
      userId,
      payload,
    });

    return {
      jobId: id,
      status: 'QUEUED',
    };
  }

  async getJob(jobId: string, userId: string): Promise<ThumbnailJobResponse> {
    const job = await this.thumbnailJobsRepository.findJobById(jobId);

    if (!job || job.userId !== userId) {
      throw new NotFoundException('Thumbnail job not found');
    }

    return {
      id: job.id,
      status: job.status,
      result: job.result,
      error: job.error,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
      completedAt: job.completedAt,
    };
  }
}
