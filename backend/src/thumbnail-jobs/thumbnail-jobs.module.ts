import { Module } from '@nestjs/common';
import { ThumbnailJobsService } from './thumbnail-jobs.service';
import { ThumbnailJobsController } from './thumbnail-jobs.controller';
import { ThumbnailJobsRepository } from 'src/thumbnail-jobs/thumbnail-jobs.repository';
import { AuthModule } from 'src/auth/auth.module';
import { SqsModule } from 'src/sqs/sqs.module';

@Module({
  providers: [ThumbnailJobsService, ThumbnailJobsRepository],
  controllers: [ThumbnailJobsController],
  imports: [AuthModule, SqsModule],
  exports: [ThumbnailJobsService]
})
export class ThumbnailJobsModule {}
