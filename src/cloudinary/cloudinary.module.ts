import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryProvider],
  exports: ['CLOUDINARY'],
})
export class CloudinaryModule {}
