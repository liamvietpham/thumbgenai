import { Injectable } from '@nestjs/common';
import { CreateThumbnailDto } from 'src/thumbnails/dto/create-thumbnail.dto';
import { ThumbnailsRepository } from 'src/thumbnails/thumbnails.repository';
import { UpdateThumbnailDto } from 'src/thumbnails/dto/update-thumbnail.dto';
import { ThumbnailJobsService } from 'src/thumbnail-jobs/thumbnail-jobs.service';

@Injectable()
export class ThumbnailsService {
  constructor(
    private readonly thumbnailsRepository: ThumbnailsRepository,
    private readonly thumbnailJobsService: ThumbnailJobsService,
  ) {}

  createThumbnail(payload: CreateThumbnailDto, userId: string) {
    return this.thumbnailJobsService.createJob(payload, userId);
  }

  async updateThumbnail(
    payload: UpdateThumbnailDto,
    thumbnailId: string,
    userId: string,
  ) {
    return await this.thumbnailsRepository.updateThumbnail({
      ...payload,
      id: thumbnailId,
      userId,
    });
  }
}
