import { Test, TestingModule } from '@nestjs/testing';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ThumbnailJobsController } from './thumbnail-jobs.controller';
import { ThumbnailJobsService } from './thumbnail-jobs.service';

describe('ThumbnailJobsController', () => {
  let controller: ThumbnailJobsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThumbnailJobsController],
      providers: [
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn().mockReturnValue('test-secret'),
          },
        },
        {
          provide: AccessTokenGuard,
          useValue: {
            canActivate: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: ThumbnailJobsService,
          useValue: {
            getJob: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ThumbnailJobsController>(ThumbnailJobsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
