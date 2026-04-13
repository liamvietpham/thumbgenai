import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { ThumbnailJobsService } from 'src/thumbnail-jobs/thumbnail-jobs.service';

@Controller('thumbnail-jobs')
export class ThumbnailJobsController {
  constructor(private readonly thumbnailJobsService: ThumbnailJobsService) {}

  @UseGuards(AccessTokenGuard)
  @Get(':jobId')
  getJob(@Param('jobId') jobId: string, @CurrentUser('sub') userId: string) {
    return this.thumbnailJobsService.getJob(jobId, userId);
  }
}
