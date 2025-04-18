import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Photo } from '../photo/models/photo.model';
import { User } from '../user/models/user.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Photo) private photoModel: typeof Photo,
    @InjectModel(User) private userModel: typeof User,
    private readonly sequelize: Sequelize,
  ) {}

  async getStats() {
    const totalUploads = await this.photoModel.count();

    
    const [mostActiveUploader] = await this.photoModel.findAll({
      attributes: [
        'userId',
        [this.sequelize.fn('COUNT', this.sequelize.col('userId')), 'uploadCount'],
      ],
      group: ['userId'],
      order: [[this.sequelize.literal('"uploadCount"'), 'DESC']],
      limit: 1,
      raw: true,
    }) as unknown as { userId: number; uploadCount: string }[];

    
    const user =
      mostActiveUploader &&
      (await this.userModel.findByPk(mostActiveUploader.userId));

    
    const largestPhoto = await this.photoModel.findOne({
      order: [['fileSize', 'DESC']],
    });

    return {
      totalUploads,
      mostActiveUploader: user
        ? {
            name: user.name,
            email: user.email,
            uploadCount: parseInt(mostActiveUploader.uploadCount, 10),
          }
        : null,
      largestPhoto
    };
  }
}
