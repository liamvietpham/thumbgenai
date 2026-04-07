import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const DDB = Symbol('DDB');

@Global()
@Module({
  imports: [ConfigService],
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
    },
  ],
  exports: [DDB],
})
export class DatabaseModule {}
