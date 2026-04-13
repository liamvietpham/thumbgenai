import { Test, TestingModule } from '@nestjs/testing';
import { ThumbnailJobsRepository } from './thumbnail-jobs.repository';
import { ThumbnailJobsService } from './thumbnail-jobs.service';

describe('ThumbnailJobsService', () => {
  let service: ThumbnailJobsService;

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
      ],
    }).compile();

    service = module.get<ThumbnailJobsService>(ThumbnailJobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
