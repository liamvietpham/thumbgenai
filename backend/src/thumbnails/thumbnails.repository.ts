import {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DDB } from 'src/database/database.module';
import { CreateThumbnailInput } from 'src/thumbnails/types/create-thumbnail-input.type';
import { UpdateThumbnailInput } from 'src/thumbnails/types/updae-thumbnail-input.type';

@Injectable()
export class ThumbnailsRepository {
  private readonly tableName: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(DDB) private readonly ddb: DynamoDBDocumentClient,
  ) {
    this.tableName = this.configService.getOrThrow<string>('THUMBNAILS_TABLE');
  }

  async createThumbnail(input: CreateThumbnailInput) {
    const now = new Date().toISOString();
    const thumbnail = {
      ...input,
      visibility: 'private',
      createdAt: now,
    };

    await this.ddb.send(
      new PutCommand({
        TableName: this.tableName,
        Item: thumbnail,
      }),
    );

    return thumbnail;
  }

  async updateThumbnail(input: UpdateThumbnailInput) {
    const { id, userId, ...rest } = input;
    const now = new Date().toISOString();
    const expressionParts: string[] = [];
    const expressionValues: { [key: string]: string | undefined } = {};

    Object.keys(rest).forEach((key) => {
      expressionParts.push(`${key} = :${key}`);
      expressionValues[`:${key}`] = rest[key] as string | undefined;
    });

    const result = await this.ddb.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { id },
        UpdateExpression: `SET ${expressionParts.length > 0 ? `${expressionParts.join(', ')},` : ''} updatedAt = :updatedAt`,
        ExpressionAttributeValues: {
          ...expressionValues,
          ':updatedAt': now,
          ':userId': userId,
        },
        ConditionExpression: 'attribute_exists(id) AND userId = :userId',
        ReturnValues: 'ALL_NEW',
      }),
    );

    return result.Attributes;
  }
}
