import { DynamoDBDocumentClient, QueryCommand, TransactWriteCommand } from '@aws-sdk/lib-dynamodb';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { generateId } from 'src/common/utils/id.util';
import { DDB } from 'src/database/database.module';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateUser } from 'src/users/types/create-user.type';

@Injectable()
export class UsersRepository {
  private readonly tableName: string;

  constructor(
    @Inject(DDB) private readonly ddb: DynamoDBDocumentClient,
    private readonly configService: ConfigService
  ) {
    this.tableName = this.configService.getOrThrow<string>('USERS_TABLE');
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const result = await this.ddb.send(
      new QueryCommand({
        TableName: this.tableName,
        IndexName: 'email-index',
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
          ':email': email
        },
        Limit: 1
      })
    );

    return (result.Items?.[0] as UserEntity | undefined) ?? null;
  }

  async createUser(input: CreateUser) {
    const now = new Date().toISOString();
    const id = await generateId();

    const user: UserEntity = {
      id,
      name: input.name,
      email: input.email,
      password: input.password,
      credits: 15,
      createdAt: now,
      updatedAt: now,
      pwdUpdatedAt: now
    };

    try {
      await this.ddb.send(
        new TransactWriteCommand({
          TransactItems: [
            {
              Put: {
                TableName: this.tableName,
                Item: user,
                ConditionExpression: 'attribute_not_exists(id)'
              }
            },
            {
              Put: {
                TableName: this.tableName,
                Item: {
                  id: `email#${user.email}`,
                  isEmailLock: true,
                  userId: user.id,
                  createdAt: now
                },
                ConditionExpression: 'attribute_not_exists(id)'
              }
            }
          ]
        })
      );
    } catch (error) {
      const err = error as { name?: string; message?: string };
      const isConditionalTransactionConflict =
        err.name === 'TransactionCanceledException' &&
        err.message?.includes('ConditionalCheckFailed');

      if (isConditionalTransactionConflict) {
        throw new ConflictException('User already exists');
      }

      throw error;
    }

    return user;
  }
}
