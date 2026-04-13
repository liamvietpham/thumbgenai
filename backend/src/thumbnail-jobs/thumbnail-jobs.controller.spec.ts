import { Test, TestingModule } from '@nestjs/testing';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ThumbnailJobsController } from './thumbnail-jobs.controller';
import { ThumbnailJobsService } from './thumbnail-jobs.service';

describe('ThumbnailJobsController', () => {
  let controller: ThumbnailJobsController;
  let thumbnailJobsService: {
    getJob: jest.Mock;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThumbnailJobsController],
      providers: [
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn()
          }
        },
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn().mockReturnValue('test-secret')
          }
        },
        {
          provide: AccessTokenGuard,
          useValue: {
            canActivate: jest.fn().mockResolvedValue(true)
          }
        },
        {
          provide: ThumbnailJobsService,
          useValue: {
            getJob: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<ThumbnailJobsController>(ThumbnailJobsController);
    thumbnailJobsService = module.get(ThumbnailJobsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('forwards job lookups to thumbnail jobs service', async () => {
    const job = {
      id: 'job-1',
      status: 'PROCESSING',
      result: undefined,
      error: undefined,
      createdAt: '2026-04-12T00:00:00.000Z',
      updatedAt: '2026-04-12T00:00:05.000Z',
      completedAt: undefined
    };

    thumbnailJobsService.getJob.mockResolvedValue(job);

    await expect(controller.getJob('job-1', 'user-1')).resolves.toBe(job);
    expect(thumbnailJobsService.getJob).toHaveBeenCalledWith('job-1', 'user-1');
  });
});
