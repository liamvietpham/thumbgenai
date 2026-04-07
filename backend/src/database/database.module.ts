import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const DDB = Symbol('DDB');

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DDB,
      useFactory(configService: ConfigService) {
        const region = configService.get<string>('AWS_REGION');
        const client = new DynamoDBClient({ region });

        return DynamoDBDocumentClient.from(client, {
          marshallOptions: { removeUndefinedValues: true },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DDB],
})
export class DatabaseModule {}
