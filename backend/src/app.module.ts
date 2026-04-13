import { Module } from '@nestjs/common';
import { HealthModule } from 'src/health/health.module';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/common/filters/all-exceptions.filter';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { SessionModule } from './session/session.module';
import { ThumbnailsModule } from './thumbnails/thumbnails.module';
import { AiModule } from './ai/ai.module';
import { S3Module } from './s3/s3.module';
import { ThumbnailJobsModule } from './thumbnail-jobs/thumbnail-jobs.module';
import { ThumbnailGenerationProcessor } from './thumbnail-jobs/thumbnail-generation.processor';
import { SqsModule } from './sqs/sqs.module';

@Module({
  providers: [
    ThumbnailGenerationProcessor,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
  imports: [
    HealthModule,
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    SessionModule,
    ThumbnailsModule,
    AiModule,
    S3Module,
    ThumbnailJobsModule,
    SqsModule,
  ],
})
export class AppModule {}
