import { Test, TestingModule } from '@nestjs/testing';
import { generateId } from 'src/common/utils/id.util';
import { SqsService } from 'src/sqs/sqs.service';
import { ThumbnailJobsRepository } from './thumbnail-jobs.repository';
import { ThumbnailJobsService } from './thumbnail-jobs.service';

jest.mock('src/common/utils/id.util', () => ({
  generateId: jest.fn(),
}));

describe('ThumbnailJobsService', () => {
  let service: ThumbnailJobsService;
  let thumbnailJobsRepository: {
    createJob: jest.Mock;
    findJobById: jest.Mock;
  };
  let sqsService: {
    sendMessage: jest.Mock;
  };

  const mockGenerateId = generateId as jest.MockedFunction<typeof generateId>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThumbnailJobsService,
        {
          provide: ThumbnailJobsRepository,
          useValue: {
            createJob: jest.fn(),
            findJobById: jest.fn(),
          },
        },
        {
          provide: SqsService,
          useValue: {
            sendMessage: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ThumbnailJobsService>(ThumbnailJobsService);
    thumbnailJobsRepository = module.get(ThumbnailJobsRepository);
    sqsService = module.get(SqsService);

    mockGenerateId.mockReset();
    mockGenerateId.mockResolvedValue('job-1');
  });

  it('creates a queued job and sends the payload to SQS', async () => {
    const payload = {
      title: 'Top smartwatch',
      prompt: 'make it bold',
      style: 'bold_and_graphic' as const,
      aspectRatio: '16:9' as const,
      colorScheme: 'vibrant' as const,
    };

    await expect(service.createJob(payload, 'user-1')).resolves.toEqual({
      jobId: 'job-1',
      status: 'QUEUED',
    });

    expect(thumbnailJobsRepository.createJob).toHaveBeenCalledWith({
      id: 'job-1',
      userId: 'user-1',
      payload,
      status: 'QUEUED',
    });
    expect(sqsService.sendMessage).toHaveBeenCalledWith({
      id: 'job-1',
      userId: 'user-1',
      payload,
    });
  });

  it('returns the job status for the current user', async () => {
    thumbnailJobsRepository.findJobById.mockResolvedValue({
      id: 'job-1',
      userId: 'user-1',
      status: 'PROCESSING',
      payload: {
        title: 'Top smartwatch',
        style: 'bold_and_graphic',
        aspectRatio: '16:9',
        colorScheme: 'vibrant',
      },
      createdAt: '2026-04-12T00:00:00.000Z',
      updatedAt: '2026-04-12T00:00:05.000Z',
    });

    await expect(service.getJob('job-1', 'user-1')).resolves.toEqual({
      id: 'job-1',
      status: 'PROCESSING',
      result: undefined,
      error: undefined,
      createdAt: '2026-04-12T00:00:00.000Z',
      updatedAt: '2026-04-12T00:00:05.000Z',
      completedAt: undefined,
    });
  });

  it('throws when the job does not belong to the user', async () => {
    thumbnailJobsRepository.findJobById.mockResolvedValue({
      id: 'job-1',
      userId: 'user-2',
      status: 'QUEUED',
      payload: {
        title: 'Top smartwatch',
        style: 'bold_and_graphic',
        aspectRatio: '16:9',
        colorScheme: 'vibrant',
      },
      createdAt: '2026-04-12T00:00:00.000Z',
    });

    await expect(service.getJob('job-1', 'user-1')).rejects.toThrow(
      'Thumbnail job not found',
    );
  });
});
