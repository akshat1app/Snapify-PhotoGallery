import { Injectable, InternalServerErrorException, NotFoundException, ForbiddenException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Photo } from './models/photo.model';
import { UploadApiResponse, v2 as CloudinaryType } from 'cloudinary';
import { Stream } from 'stream';

@Injectable()
export class PhotoService {
  constructor(
    @InjectModel(Photo) private photoModel: typeof Photo,
    @Inject('CLOUDINARY') private cloudinary: typeof CloudinaryType,
  ) {}

  private streamUpload(fileBuffer: Buffer): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream(
        {
          folder: 'snapify_photos',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result as UploadApiResponse);
        },
      );

      const readable = new Stream.Readable();
      readable._read = () => {};
      readable.push(fileBuffer);
      readable.push(null);
      readable.pipe(uploadStream);
    });
  }

  async uploadPhoto(file: Express.Multer.File, caption: string, userId: number) {
    try {
      const uploaded = await this.streamUpload(file.buffer);
      console.log(userId);
      return this.photoModel.create({
        caption,
        fileName: uploaded.original_filename,
        filePath: uploaded.secure_url,
        fileSize: file.size,
        userId,
      });
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      throw new InternalServerErrorException('Photo upload failed');
    }
  }

  async getall(userId: number, page = 1) {
    const limit = 10;
    const offset = (page - 1) * limit;
    return this.photoModel.findAndCountAll({
      where: { userId },
      offset,
      limit,
    });
  }

  async getPhotoByUser(id: number) {
    const photo = await this.photoModel.findByPk(id);
    if (!photo) throw new NotFoundException('Photo not found');
    return photo;
  }

  async deletePhoto(id: number, userId: number) {
    const photo = await this.photoModel.findByPk(id);
    if (!photo) throw new NotFoundException('Photo not found');
    if (photo.userId !== userId) throw new ForbiddenException('Not authorized');

    // Optional: delete from Cloudinary as well using the public_id
    await photo.destroy();
    return { message: 'Photo deleted' };
  }
}
