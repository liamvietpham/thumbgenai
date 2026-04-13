import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThumbnailJobMessage } from 'src/sqs/types/thumbnail-job-message.type';

@Injectable()
export class SqsService {
  private readonly sqsClient: SQSClient;
  private readonly queueUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.sqsClient = new SQSClient({
      region: this.configService.getOrThrow<string>('AWS_REGION')
    });
    this.queueUrl = this.configService.getOrThrow<string>('THUMBNAIL_JOBS_QUEUE_URL');
  }

  async sendMessage(message: ThumbnailJobMessage) {
    await this.sqsClient.send(
      new SendMessageCommand({
        QueueUrl: this.queueUrl,
        MessageBody: JSON.stringify(message)
      })
    );
  }
}
