import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { generateId } from 'src/common/utils/id.util';
import { S3Service } from './s3.service';

jest.mock('@aws-sdk/s3-request-presigner', () => ({
  getSignedUrl: jest.fn()
}));

jest.mock('src/common/utils/id.util', () => ({
  generateId: jest.fn()
}));

describe('S3Service', () => {
  let service: S3Service;
  let sendSpy: jest.SpiedFunction<S3Client['send']>;
  const mockGenerateId = generateId as jest.MockedFunction<typeof generateId>;
  const mockGetSignedUrl = getSignedUrl as jest.MockedFunction<typeof getSignedUrl>;

  const getS3Client = () => (service as unknown as { s3Client: S3Client }).s3Client;

  const getSentCommand = () => {
    const firstCall = sendSpy.mock.calls[0] as unknown as Parameters<S3Client['send']>;
    const command = firstCall[0];

    expect(command).toBeInstanceOf(PutObjectCommand);

    return command as PutObjectCommand;
  };

  beforeEach(async () => {
    mockGetSignedUrl.mockReset();
    mockGenerateId.mockReset();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        S3Service,
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn((key: string) => {
              const configMap: Record<string, string> = {
                AWS_REGION: 'ap-southeast-1',
                AWS_ACCESS_KEY_ID: 'test-access-key',
                AWS_SECRET_ACCESS_KEY: 'test-secret-key',
                AWS_BUCKET_NAME: 'thumbgen-bucket',
                AWS_CLOUDFRONT_DOMAIN: 'https://cdn.example.com'
              };

              return configMap[key];
            })
          }
        }
      ]
    }).compile();

    service = module.get<S3Service>(S3Service);
    sendSpy = jest.spyOn(getS3Client(), 'send').mockResolvedValue({} as never);
  });

  afterEach(() => {
    sendSpy.mockRestore();
  });

  it('creates a presigned upload URL with a sanitized file name', async () => {
    mockGenerateId.mockResolvedValue('file-1');
    mockGetSignedUrl.mockResolvedValue('https://signed.example.com/upload');

    const result = await service.createPresignedUrl({
      fileName: 'Anh dai dien.png',
      contentType: 'image/webp'
    });

    expect(mockGetSignedUrl).toHaveBeenCalledTimes(1);

    const [, command, options] = mockGetSignedUrl.mock.calls[0] as [
      S3Client,
      PutObjectCommand,
      { expiresIn: number }
    ];

    expect(command.input).toEqual({
      Bucket: 'thumbgen-bucket',
      Key: 'uploads/file-1-anh-dai-dien.webp',
      ContentType: 'image/webp'
    });
    expect(options).toEqual({ expiresIn: 60 * 5 });
    expect(result).toEqual({
      signedUrl: 'https://signed.example.com/upload',
      url: 'https://cdn.example.com/uploads/file-1-anh-dai-dien.webp'
    });
  });

  it('uploads a file without adding a leading slash when no folder is provided', async () => {
    mockGenerateId.mockResolvedValue('file-2');

    const result = await service.uploadFile({
      fileName: 'thumbnail.png',
      contentType: 'image/png',
      file: Buffer.from('thumbnail')
    });

    expect(sendSpy).toHaveBeenCalledTimes(1);
    const command = getSentCommand();

    expect(command.input).toEqual({
      Bucket: 'thumbgen-bucket',
      Key: 'file-2-thumbnail.png',
      Body: Buffer.from('thumbnail'),
      ContentType: 'image/png'
    });
    expect(result).toBe('https://cdn.example.com/file-2-thumbnail.png');
  });

  it('uploads a file into the requested folder when one is provided', async () => {
    mockGenerateId.mockResolvedValue('file-3');

    const result = await service.uploadFile({
      fileName: 'thumbnail.png',
      contentType: 'image/png',
      file: Buffer.from('thumbnail'),
      folderName: 'generated-images'
    });

    const command = getSentCommand();

    expect(command.input).toMatchObject({
      Key: 'generated-images/file-3-thumbnail.png'
    });
    expect(result).toBe('https://cdn.example.com/generated-images/file-3-thumbnail.png');
  });
});
