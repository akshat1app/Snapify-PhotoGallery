import {
    Controller, Post, Get, Param, Delete, UseGuards,
    Req, UploadedFile, UseInterceptors, Query, Body,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
  import { PhotoService } from './photo.service';
  import { UploadPhotoDto } from './dto/upload-photo.dto';
  
  @Controller('photos')
  export class PhotoController {
    constructor(private photoService: PhotoService) {}
  
    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async uploadPhoto(
      @UploadedFile() file: Express.Multer.File,
      @Body() dto: UploadPhotoDto,
      @Req() req,
    ) {
      
      return this.photoService.uploadPhoto(file, dto.caption, req.user.userId);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get()
    async list(@Req() req, @Query('page') page: number) {
      return this.photoService.getall(req.user.sub, page);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async view(@Param('id') id: number) {
      return this.photoService.getPhotoByUser(id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: number, @Req() req) {
      return this.photoService.deletePhoto(id, req.user.sub);
    }
  }
  