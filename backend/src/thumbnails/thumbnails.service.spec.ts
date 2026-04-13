import { Test, TestingModule } from '@nestjs/testing';
import { ThumbnailsRepository } from 'src/thumbnails/thumbnails.repository';
import { ThumbnailsService } from './thumbnails.service';
import { ThumbnailJobsService } from 'src/thumbnail-jobs/thumbnail-jobs.service';

type MockThumbnailsRepository = {
  updateThumbnail: jest.MockedFunction<ThumbnailsRepository['updateThumbnail']>;
};

type MockThumbnailJobsService = {
  createJob: jest.MockedFunction<ThumbnailJobsService['createJob']>;
};

describe('ThumbnailsService', () => {
  let service: ThumbnailsService;
  let thumbnailsRepository: MockThumbnailsRepository;
  let thumbnailJobsService: MockThumbnailJobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThumbnailsService,
        {
          provide: ThumbnailsRepository,
          useValue: {
            updateThumbnail: jest.fn()
          }
        },
        {
          provide: ThumbnailJobsService,
          useValue: {
            createJob: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<ThumbnailsService>(ThumbnailsService);
    thumbnailsRepository = module.get(ThumbnailsRepository);
    thumbnailJobsService = module.get(ThumbnailJobsService);
  });

  it('delegates thumbnail creation to thumbnail jobs and returns queued job metadata', async () => {
    thumbnailJobsService.createJob.mockResolvedValue({
      jobId: 'job-1',
      status: 'QUEUED'
    });

    const payload = {
      title: 'Ảnh thumbnail đẹp',
      style: 'tech_futuristic' as const,
      aspectRatio: '16:9' as const,
      colorScheme: 'neon' as const
    };

    await expect(service.createThumbnail(payload, 'user-1')).resolves.toEqual({
      jobId: 'job-1',
      status: 'QUEUED'
    });

    expect(thumbnailJobsService.createJob).toHaveBeenCalledWith(payload, 'user-1');
  });

  it('forwards visibility updates with the current user ownership scope', async () => {
    thumbnailsRepository.updateThumbnail.mockResolvedValue({
      id: 'thumbnail-1',
      userId: 'user-1',
      visibility: 'public',
      updatedAt: '2026-04-12T00:00:00.000Z'
    } as Awaited<ReturnType<ThumbnailsRepository['updateThumbnail']>>);

    await service.updateThumbnail(
      {
        visibility: 'public'
      },
      'thumbnail-1',
      'user-1'
    );

    expect(thumbnailsRepository.updateThumbnail).toHaveBeenCalledWith({
      id: 'thumbnail-1',
      userId: 'user-1',
      visibility: 'public'
    });
  });
});
