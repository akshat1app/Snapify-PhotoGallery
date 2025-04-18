import { IsNotEmpty, IsString } from 'class-validator';

export class UploadPhotoDto {
  @IsString()
  @IsNotEmpty()
  caption: string;
}
