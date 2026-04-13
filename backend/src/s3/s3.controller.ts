import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CreatePresignedUrlDto } from 'src/s3/dto/create-presigned-url.dto';
import { S3Service } from 'src/s3/s3.service';
import { PresignedUrlResponse } from 'src/s3/types/presigned-url-response.type';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @UseGuards(AccessTokenGuard)
  @Post('presigned-url')
  createPresignedUrl(
    @Body() payload: CreatePresignedUrlDto,
  ): Promise<PresignedUrlResponse> {
    return this.s3Service.createPresignedUrl(payload);
  }
}
