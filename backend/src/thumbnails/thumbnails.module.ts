import { Module } from '@nestjs/common';
import { ThumbnailsRepository } from 'src/thumbnails/thumbnails.repository';
import { ThumbnailsService } from './thumbnails.service';
import { ThumbnailsController } from './thumbnails.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ThumbnailJobsModule } from 'src/thumbnail-jobs/thumbnail-jobs.module';

@Module({
  imports: [AuthModule, ThumbnailJobsModule],
  providers: [ThumbnailsService, ThumbnailsRepository],
  controllers: [ThumbnailsController],
  exports: [ThumbnailsRepository],
})
export class ThumbnailsModule {}
