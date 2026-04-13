import { INestApplicationContext, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SQSEvent, SQSRecord } from 'aws-lambda';
import { AppModule } from 'src/app.module';
import { ThumbnailJobError } from 'src/thumbnail-jobs/entities/thumbnail-job.entity';
import { ThumbnailGenerationProcessor } from 'src/thumbnail-jobs/thumbnail-generation.processor';
import { ThumbnailJobsRepository } from 'src/thumbnail-jobs/thumbnail-jobs.repository';
import { ProcessThumbnailJobInput } from 'src/thumbnail-jobs/types/process-thumbnail-job-input.type';

const logger = new Logger('ThumbnailJobsWorker');
let appContextPromise: Promise<INestApplicationContext> | undefined;

function getAppContext(): Promise<INestApplicationContext> {
  appContextPromise ??= NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'log']
  });

  return appContextPromise;
}

function parseMessage(record: SQSRecord): ProcessThumbnailJobInput {
  return JSON.parse(record.body) as ProcessThumbnailJobInput;
}

function isConditionalWriteError(error: unknown) {
  return error instanceof Error && error.name === 'ConditionalCheckFailedException';
}

function toJobError(error: unknown): ThumbnailJobError {
  return {
    code: 'THUMBNAIL_JOB_FAILED',
    message: error instanceof Error ? error.message : 'Unknown error',
    retryable: true
  };
}

async function processRecord(record: SQSRecord): Promise<void> {
  const app = await getAppContext();
  const jobsRepository = app.get(ThumbnailJobsRepository);
  const processor = app.get(ThumbnailGenerationProcessor);
  const input = parseMessage(record);

  try {
    await jobsRepository.markProcessing(input.id, input.userId);
  } catch (error) {
    if (isConditionalWriteError(error)) {
      logger.log(`Skip job ${input.id} because it was already handled`);
      return;
    }

    throw error;
  }

  try {
    const output = await processor.process(input);
    await jobsRepository.markDone(input.id, input.userId, output.jobResult);
  } catch (error) {
    await jobsRepository.markFailed(input.id, input.userId, toJobError(error));
    throw error;
  }
}

export async function handler(event: SQSEvent): Promise<void> {
  for (const record of event.Records) {
    await processRecord(record);
  }
}
