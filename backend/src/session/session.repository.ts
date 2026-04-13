import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand
} from '@aws-sdk/lib-dynamodb';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DDB } from 'src/database/database.module';
import { CreateSession } from 'src/session/types/create-session.type';
import { SessionEntity } from './entities/session.entity';
import { RotateSession } from 'src/session/types/rotate-session.type';

@Injectable()
export class SessionRepository {
  private readonly tableName: string;

  constructor(
    @Inject(DDB) private readonly ddb: DynamoDBDocumentClient,
    private readonly configService: ConfigService
  ) {
    this.tableName = this.configService.getOrThrow<string>('SESSIONS_TABLE');
  }

  async createSession(data: CreateSession) {
    const now = new Date().toISOString();

    const session: SessionEntity = {
      id: data.sid,
      userId: data.userId,
      refreshToken: data.refreshToken,
      ttl: data.ttl,
      expiresAt: data.expiresAt,
      createdAt: now,
      updatedAt: now
    };

    await this.ddb.send(
      new PutCommand({
        TableName: this.tableName,
        Item: session,
        ConditionExpression: 'attribute_not_exists(id)'
      })
    );
  }

  async revokeSession(sid: string) {
    await this.ddb.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { id: sid }
      })
    );
  }

  async findSessionById(sid: string) {
    const result = await this.ddb.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { id: sid }
      })
    );

    return result.Item as SessionEntity | undefined;
  }

  async rotateSession(data: RotateSession) {
    await this.ddb.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { id: data.sid },
        UpdateExpression:
          'SET refreshToken = :refreshToken, ttl = :ttl, expiresAt = :expiresAt, updatedAt = :updatedAt',
        ExpressionAttributeValues: {
          ':refreshToken': data.refreshToken,
          ':ttl': data.ttl,
          ':expiresAt': data.expiresAt,
          ':updatedAt': data.updatedAt,
          ':curRefreshToken': data.curRefreshToken
        },
        ConditionExpression: 'attribute_exists(id) AND refreshToken = :curRefreshToken'
      })
    );
  }
}
