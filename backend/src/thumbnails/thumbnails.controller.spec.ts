import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ThumbnailsController } from './thumbnails.controller';
import { ThumbnailsService } from './thumbnails.service';

describe('ThumbnailsController', () => {
  let controller: ThumbnailsController;
  let thumbnailsService: {
    createThumbnail: jest.Mock;
    updateThumbnail: jest.Mock;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThumbnailsController],
      providers: [
        {
          provide: ThumbnailsService,
          useValue: {
            createThumbnail: jest.fn(),
            updateThumbnail: jest.fn()
          }
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn()
          }
        },
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn().mockReturnValue('test-access-secret')
          }
        }
      ]
    }).compile();

    controller = module.get<ThumbnailsController>(ThumbnailsController);
    thumbnailsService = module.get(ThumbnailsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('forwards create requests to the thumbnails service', async () => {
    const payload = {
      title: 'Top smartwatch',
      prompt: 'make it bold',
      style: 'bold_and_graphic' as const,
      aspectRatio: '16:9' as const,
      colorScheme: 'vibrant' as const
    };
    const createdThumbnail = {
      id: 'thumbnail-1',
      userId: 'user-1',
      visibility: 'private'
    };

    thumbnailsService.createThumbnail.mockResolvedValue(createdThumbnail);

    await expect(controller.createThumbnail(payload, 'user-1')).resolves.toBe(createdThumbnail);
    expect(thumbnailsService.createThumbnail).toHaveBeenCalledWith(payload, 'user-1');
  });

  it('forwards visibility updates to the thumbnails service', async () => {
    const payload = {
      visibility: 'public' as const
    };
    const updatedThumbnail = {
      id: 'thumbnail-1',
      userId: 'user-1',
      visibility: 'public'
    };

    thumbnailsService.updateThumbnail.mockResolvedValue(updatedThumbnail);

    await expect(controller.updateThumbnail(payload, 'user-1', 'thumbnail-1')).resolves.toBe(
      updatedThumbnail
    );
    expect(thumbnailsService.updateThumbnail).toHaveBeenCalledWith(
      payload,
      'thumbnail-1',
      'user-1'
    );
  });
});
