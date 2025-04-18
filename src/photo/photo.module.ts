import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Photo } from './models/photo.model';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { User } from '../user/models/user.model';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [SequelizeModule.forFeature([Photo, User]), CloudinaryModule],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
