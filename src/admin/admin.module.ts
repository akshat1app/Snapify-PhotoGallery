// src/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Photo } from '../photo/models/photo.model';
import { User } from '../user/models/user.model';
import { AdminGuard } from './guards/admin.guard';

@Module({
  imports: [SequelizeModule.forFeature([Photo, User])],
  controllers: [AdminController],
  providers: [AdminService, AdminGuard],
})
export class AdminModule {}
