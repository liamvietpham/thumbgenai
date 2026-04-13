import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';

describe('S3Controller', () => {
  let controller: S3Controller;
  let s3Service: {
    createPresignedUrl: jest.Mock;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [S3Controller],
      providers: [
        {
          provide: S3Service,
          useValue: {
            createPresignedUrl: jest.fn()
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
        },
        {
          provide: AccessTokenGuard,
          useValue: {
            canActivate: jest.fn().mockResolvedValue(true)
          }
        }
      ]
    }).compile();

    controller = module.get<S3Controller>(S3Controller);
    s3Service = module.get(S3Service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('forwards presigned url requests to the s3 service', async () => {
    const payload = {
      fileName: 'thumbnail.png',
      contentType: 'image/png'
    };
    const response = {
      signedUrl: 'https://signed.example.com/upload',
      url: 'https://cdn.example.com/uploads/file-1-thumbnail.png'
    };

    s3Service.createPresignedUrl.mockResolvedValue(response);

    await expect(controller.createPresignedUrl(payload)).resolves.toBe(response);
    expect(s3Service.createPresignedUrl).toHaveBeenCalledWith(payload);
  });
});
