import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CreateThumbnailDto } from 'src/thumbnails/dto/create-thumbnail.dto';
import { UpdateThumbnailDto } from 'src/thumbnails/dto/update-thumbnail.dto';
import { ThumbnailsService } from 'src/thumbnails/thumbnails.service';

@Controller('thumbnails')
export class ThumbnailsController {
  constructor(private readonly thumbnailsService: ThumbnailsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async createThumbnail(
    @Body() payload: CreateThumbnailDto,
    @CurrentUser('sub') userId: string,
  ) {
    return await this.thumbnailsService.createThumbnail(payload, userId);
  }

  @UseGuards(AccessTokenGuard)
  @Post(':id')
  async updateThumbnail(
    @Body() payload: UpdateThumbnailDto,
    @CurrentUser('sub') userId: string,
    @Param('id') id: string,
  ) {
    return await this.thumbnailsService.updateThumbnail(payload, id, userId);
  }
}
