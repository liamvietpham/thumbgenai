import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DDB } from 'src/database/database.module';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateUser } from 'src/users/types/create-user.type';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class UsersRepository {
  private readonly tableName: string;

  constructor(
    @Inject(DDB) private readonly ddb: DynamoDBDocumentClient,
    private readonly configService: ConfigService,
  ) {
    this.tableName = this.configService.get<string>('USERS_TABLE', '');
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const result = await this.ddb.send(
      new QueryCommand({
        TableName: this.tableName,
        IndexName: 'email-index',
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
          ':email': email,
        },
        Limit: 1,
      }),
    );

    return (result.Items?.[0] as UserEntity | undefined) ?? null;
  }

  async createUser(input: CreateUser) {
    const now = new Date().toISOString();

    const user: UserEntity = {
      id: uuidv7(),
      name: input.name,
      email: input.email,
      password: input.password,
      credits: 15,
      createdAt: now,
      updatedAt: now,
      pwdUpdatedAt: now,
    };

    await this.ddb.send(
      new PutCommand({
        TableName: this.tableName,
        Item: user,
        ConditionExpression: 'attribute_not_exists(id)',
      }),
    );

    return user;
  }
}
