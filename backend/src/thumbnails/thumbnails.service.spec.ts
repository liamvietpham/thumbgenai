import { BadGatewayException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { generateId } from 'src/common/utils/id.util';
import { VertexProvider } from 'src/ai/providers/vertex.provider';
import {
  COLOR_SCHEME_DESCRIPTIONS,
  STYLE_PROMPTS,
} from 'src/thumbnails/constants/thumbnails.constant';
import { THUMBNAIL_UPLOAD_FOLDER } from 'src/s3/constants/s3.constant';
import { S3Service } from 'src/s3/s3.service';
import { ThumbnailsRepository } from 'src/thumbnails/thumbnails.repository';
import { ThumbnailsService } from './thumbnails.service';

jest.mock('src/common/utils/id.util', () => ({
  generateId: jest.fn(),
}));

type MockVertexProvider = {
  generateImage: jest.MockedFunction<VertexProvider['generateImage']>;
};

type MockS3Service = {
  uploadFile: jest.MockedFunction<S3Service['uploadFile']>;
};

type MockThumbnailsRepository = {
  createThumbnail: jest.MockedFunction<ThumbnailsRepository['createThumbnail']>;
  updateThumbnail: jest.MockedFunction<ThumbnailsRepository['updateThumbnail']>;
};

describe('ThumbnailsService', () => {
  let service: ThumbnailsService;
  let vertexProvider: MockVertexProvider;
  let s3Service: MockS3Service;
  let thumbnailsRepository: MockThumbnailsRepository;
  const mockGenerateId = generateId as jest.MockedFunction<typeof generateId>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThumbnailsService,
        {
          provide: VertexProvider,
          useValue: {
            generateImage: jest.fn(),
          },
        },
        {
          provide: S3Service,
          useValue: {
            uploadFile: jest.fn(),
          },
        },
        {
          provide: ThumbnailsRepository,
          useValue: {
            createThumbnail: jest.fn(),
            updateThumbnail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ThumbnailsService>(ThumbnailsService);
    vertexProvider = module.get(VertexProvider);
    s3Service = module.get(S3Service);
    thumbnailsRepository = module.get(ThumbnailsRepository);
    mockGenerateId.mockReset();
    mockGenerateId.mockResolvedValue('thumbnail-1');
  });

  it('creates a thumbnail, falls back to the title when prompt is absent, and persists the generated image', async () => {
    const base64 = Buffer.from('thumbnail-image').toString('base64');
    const payload = {
      title: 'Ảnh thumbnail đẹp',
      style: 'tech_futuristic' as const,
      aspectRatio: '16:9' as const,
      colorScheme: 'neon' as const,
    };
    const persistedThumbnail = {
      id: 'thumbnail-1',
      userId: 'user-1',
      title: payload.title,
      promptUsed: 'prompt-used',
      style: payload.style,
      aspectRatio: payload.aspectRatio,
      colorScheme: payload.colorScheme,
      provider: 'vertex',
      model: 'gemini-2.5-flash-image',
      imageUrl: 'https://cdn.example.com/generated-images/thumbnail.png',
      visibility: 'private' as const,
      createdAt: '2026-04-12T00:00:00.000Z',
    };

    vertexProvider.generateImage.mockResolvedValue({
      provider: 'vertex',
      model: 'gemini-2.5-flash-image',
      text: null,
      images: [
        {
          mimeType: 'image/png',
          base64,
        },
      ],
    });
    s3Service.uploadFile.mockResolvedValue(persistedThumbnail.imageUrl);
    thumbnailsRepository.createThumbnail.mockImplementation((input) =>
      Promise.resolve({
        ...input,
        visibility: 'private',
        createdAt: persistedThumbnail.createdAt,
      } as Awaited<ReturnType<ThumbnailsRepository['createThumbnail']>>),
    );

    const result = await service.createThumbnail(payload, 'user-1');

    expect(vertexProvider.generateImage).toHaveBeenCalledTimes(1);
    const request = vertexProvider.generateImage.mock.calls[0][0];
    expect(request.model).toBe('gemini-2.5-flash-image');
    expect(request.config).toMatchObject({
      imageConfig: {
        aspectRatio: '16:9',
        imageSize: '1K',
      },
    });
    expect(request.contents).toContain(
      'A thumbnail concept centered on "Ảnh thumbnail đẹp"',
    );
    expect(request.contents).toContain(STYLE_PROMPTS.tech_futuristic);
    expect(request.contents).toContain(COLOR_SCHEME_DESCRIPTIONS.neon);

    expect(s3Service.uploadFile).toHaveBeenCalledWith({
      file: Buffer.from(base64, 'base64'),
      fileName: 'anh-thumbnail-dep.png',
      contentType: 'image/png',
      folderName: THUMBNAIL_UPLOAD_FOLDER,
    });

    expect(thumbnailsRepository.createThumbnail).toHaveBeenCalledWith({
      id: 'thumbnail-1',
      userId: 'user-1',
      title: payload.title,
      prompt: undefined,
      promptUsed: request.contents,
      style: payload.style,
      aspectRatio: payload.aspectRatio,
      colorScheme: payload.colorScheme,
      provider: 'vertex',
      model: 'gemini-2.5-flash-image',
      imageUrl: persistedThumbnail.imageUrl,
    });
    expect(result).toEqual({
      id: 'thumbnail-1',
      userId: 'user-1',
      title: payload.title,
      prompt: undefined,
      promptUsed: request.contents,
      style: payload.style,
      aspectRatio: payload.aspectRatio,
      colorScheme: payload.colorScheme,
      provider: 'vertex',
      model: 'gemini-2.5-flash-image',
      imageUrl: persistedThumbnail.imageUrl,
      visibility: 'private',
      createdAt: persistedThumbnail.createdAt,
    });
  });

  it('throws a BadGatewayException when Vertex does not return a usable image', async () => {
    vertexProvider.generateImage.mockResolvedValue({
      provider: 'vertex',
      model: 'gemini-2.5-flash-image',
      text: null,
      images: [
        {
          mimeType: 'image/png',
          base64: '',
        },
      ],
    });

    await expect(
      service.createThumbnail(
        {
          title: 'Thumbnail title',
          prompt: 'custom prompt',
          style: 'bold_and_graphic',
          aspectRatio: '16:9',
          colorScheme: 'vibrant',
        },
        'user-1',
      ),
    ).rejects.toThrow(BadGatewayException);

    expect(s3Service.uploadFile).not.toHaveBeenCalled();
    expect(thumbnailsRepository.createThumbnail).not.toHaveBeenCalled();
  });

  it('forwards visibility updates with the current user ownership scope', async () => {
    thumbnailsRepository.updateThumbnail.mockResolvedValue({
      id: 'thumbnail-1',
      userId: 'user-1',
      visibility: 'public',
      updatedAt: '2026-04-12T00:00:00.000Z',
    } as Awaited<ReturnType<ThumbnailsRepository['updateThumbnail']>>);

    await service.updateThumbnail(
      {
        visibility: 'public',
      },
      'thumbnail-1',
      'user-1',
    );

    expect(thumbnailsRepository.updateThumbnail).toHaveBeenCalledWith({
      id: 'thumbnail-1',
      userId: 'user-1',
      visibility: 'public',
    });
  });
});
