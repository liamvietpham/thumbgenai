import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { generateFileName } from 'src/common/utils/file-name.util';
import { generateId } from 'src/common/utils/id.util';
import { USER_UPLOAD_FOLDER } from 'src/s3/constants/s3.constant';
import { CreatePresignedUrlDto } from 'src/s3/dto/create-presigned-url.dto';
import { PresignedUrlResponse } from 'src/s3/types/presigned-url-response.type';
import { UploadFile } from 'src/s3/types/upload-file.type';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly cdnDomain: string;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow<string>('AWS_SECRET_ACCESS_KEY')
      }
    });
    this.bucketName = this.configService.getOrThrow<string>('AWS_BUCKET_NAME');
    this.cdnDomain = this.configService.getOrThrow<string>('AWS_CLOUDFRONT_DOMAIN');
  }

  async createPresignedUrl(payload: CreatePresignedUrlDto): Promise<PresignedUrlResponse> {
    const { fileName: fileNamePayload, contentType } = payload;
    const fileName = generateFileName(fileNamePayload, contentType);

    const fileId = await generateId();
    const key = `${USER_UPLOAD_FOLDER}/${fileId}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: contentType
    });

    const signedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: 60 * 5
    });

    return { signedUrl, url: this.getFileUrl(key) };
  }

  async uploadFile(payload: UploadFile) {
    const { fileName, contentType, file, folderName } = payload;
    const fileId = await generateId();
    const folder = folderName ? `${folderName}` : '';
    const key = folder ? `${folder}/${fileId}-${fileName}` : `${fileId}-${fileName}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file,
        ContentType: contentType
      })
    );

    return this.getFileUrl(key);
  }

  private getFileUrl(key: string) {
    return `${this.cdnDomain}/${key}`;
  }
}
