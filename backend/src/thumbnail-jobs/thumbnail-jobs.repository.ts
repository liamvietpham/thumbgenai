import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand
} from '@aws-sdk/lib-dynamodb';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DDB } from 'src/database/database.module';
import {
  ThumbnailJob,
  ThumbnailJobError,
  ThumbnailJobResult
} from 'src/thumbnail-jobs/entities/thumbnail-job.entity';
import { CreateThumbnailJobInput } from 'src/thumbnail-jobs/types/create-thumbnail-job-input.type';

@Injectable()
export class ThumbnailJobsRepository {
  private readonly tableName: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(DDB) private readonly ddb: DynamoDBDocumentClient
  ) {
    this.tableName = this.configService.getOrThrow<string>('THUMBNAIL_JOBS_TABLE');
  }

  async createJob(input: CreateThumbnailJobInput) {
    const now = new Date().toISOString();
    const job: ThumbnailJob = {
      ...input,
      createdAt: now,
      updatedAt: now
    };
    await this.ddb.send(
      new PutCommand({
        TableName: this.tableName,
        Item: job,
        ConditionExpression: 'attribute_not_exists(id)'
      })
    );
  }

  async findJobById(id: string) {
    const result = await this.ddb.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { id }
      })
    );

    return result.Item as ThumbnailJob | undefined;
  }

  async markProcessing(id: string, userId: string) {
    const now = new Date().toISOString();

    const result = await this.ddb.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { id },
        ExpressionAttributeValues: {
          ':userId': userId,
          ':currentStatus': 'QUEUED',
          ':status': 'PROCESSING',
          ':updatedAt': now
        },
        UpdateExpression: 'SET status = :status, updatedAt = :updatedAt',
        ConditionExpression:
          'attribute_exists(id) AND userId = :userId AND status = :currentStatus',
        ReturnValues: 'ALL_NEW'
      })
    );

    return result.Attributes;
  }

  async markDone(id: string, userId: string, jobResult: ThumbnailJobResult) {
    const now = new Date().toISOString();

    const result = await this.ddb.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { id },
        UpdateExpression:
          'SET result = :result, status = :status, completedAt = :completedAt, updatedAt = :updatedAt',
        ExpressionAttributeValues: {
          ':currentStatus': 'PROCESSING',
          ':status': 'DONE',
          ':userId': userId,
          ':result': jobResult,
          ':completedAt': now,
          ':updatedAt': now
        },
        ConditionExpression:
          'attribute_exists(id) AND userId = :userId AND status = :currentStatus',
        ReturnValues: 'ALL_NEW'
      })
    );

    return result.Attributes;
  }

  async markFailed(id: string, userId: string, jobError: ThumbnailJobError) {
    const now = new Date().toISOString();

    const result = await this.ddb.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { id },
        UpdateExpression:
          'SET status = :status, error = :error, updatedAt = :updatedAt, completedAt = :completedAt',
        ExpressionAttributeValues: {
          ':currentStatus': 'PROCESSING',
          ':status': 'FAILED',
          ':userId': userId,
          ':error': jobError,
          ':updatedAt': now,
          ':completedAt': now
        },
        ConditionExpression:
          'attribute_exists(id) AND userId = :userId AND status = :currentStatus',
        ReturnValues: 'ALL_NEW'
      })
    );

    return result.Attributes;
  }
}
