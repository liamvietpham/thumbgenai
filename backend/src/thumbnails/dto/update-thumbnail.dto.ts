import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateThumbnailDto {
  @IsEnum(['private', 'public', 'deleted'])
  @IsNotEmpty()
  visibility: 'private' | 'public' | 'deleted';
}
