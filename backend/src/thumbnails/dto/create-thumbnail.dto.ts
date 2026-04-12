import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateThumbnailDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  prompt?: string;

  @IsEnum([
    'bold_and_graphic',
    'tech_futuristic',
    'minimalist',
    'photorealistic',
    'illustrated',
  ])
  @IsNotEmpty()
  style:
    | 'bold_and_graphic'
    | 'tech_futuristic'
    | 'minimalist'
    | 'photorealistic'
    | 'illustrated';

  @IsEnum(['16:9', '1:1', '9:16'])
  @IsNotEmpty()
  aspectRatio: '16:9' | '1:1' | '9:16';

  @IsEnum([
    'vibrant',
    'sunset',
    'forest',
    'neon',
    'purple',
    'monochrome',
    'ocean',
    'pastel',
  ])
  @IsNotEmpty()
  colorScheme:
    | 'vibrant'
    | 'sunset'
    | 'forest'
    | 'neon'
    | 'purple'
    | 'monochrome'
    | 'ocean'
    | 'pastel';
}
