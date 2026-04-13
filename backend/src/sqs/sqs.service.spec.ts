import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { SqsService } from './sqs.service';

describe('SqsService', () => {
  let service: SqsService;
  let sendSpy: jest.SpyInstance | undefined;
  const configService = {
    getOrThrow: jest.fn()
  };

  beforeEach(async () => {
    configService.getOrThrow.mockReset();
    configService.getOrThrow.mockImplementation((key: string) => {
      if (key === 'AWS_REGION') {
        return 'ap-southeast-1';
      }

      if (key === 'THUMBNAIL_JOBS_QUEUE_URL') {
        return 'https://sqs.ap-southeast-1.amazonaws.com/123456789012/thumbgen-thumbnail-jobs';
      }

      return '';
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SqsService,
        {
          provide: ConfigService,
          useValue: configService
        }
      ]
    }).compile();

    service = module.get<SqsService>(SqsService);
    sendSpy = jest
      .spyOn((service as unknown as { sqsClient: { send: jest.Mock } }).sqsClient, 'send')
      .mockResolvedValue({} as never);
  });

  afterEach(() => {
    sendSpy?.mockRestore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('sends a serialized thumbnail job message to the configured queue', async () => {
    const message = {
      id: 'job-1',
      userId: 'user-1',
      payload: {
        title: 'Top smartwatch',
        style: 'bold_and_graphic' as const,
        aspectRatio: '16:9' as const,
        colorScheme: 'vibrant' as const
      }
    };

    await service.sendMessage(message);

    expect(sendSpy).toHaveBeenCalledTimes(1);
    const command = (sendSpy?.mock.calls[0] as unknown as [SendMessageCommand])[0];

    expect(command).toBeInstanceOf(SendMessageCommand);
    expect(command.input).toEqual({
      QueueUrl: 'https://sqs.ap-southeast-1.amazonaws.com/123456789012/thumbgen-thumbnail-jobs',
      MessageBody: JSON.stringify(message)
    });
  });
});
