import { Module } from '@nestjs/common';
import { S3Module } from 'src/s3/s3.module';
import { ThumbnailsRepository } from 'src/thumbnails/thumbnails.repository';
import { ThumbnailsService } from './thumbnails.service';
import { ThumbnailsController } from './thumbnails.controller';
import { AiModule } from 'src/ai/ai.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AiModule, S3Module, AuthModule],
  providers: [ThumbnailsService, ThumbnailsRepository],
  controllers: [ThumbnailsController],
})
export class ThumbnailsModule {}
