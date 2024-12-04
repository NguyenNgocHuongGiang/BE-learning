import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Response } from 'express';

@Controller('video') // localhost:8080/video/
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('/create-video')
  create(@Body() createVideoDto: CreateVideoDto, @Res() res: Response) {
    return res.status(HttpStatus.CREATED).json(createVideoDto);
    // return this.videoService.create(createVideoDto);
  }

  @Get('/get-videos')
  async findAll(
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('keyword') keyword: string,
    @Res() res: Response,
    @Headers('token') token: string,
  ): Promise<any> {
    try {
      // return res.status(HttpStatus.OK).json({ page, size, keyword });
      let videos = await this.videoService.findAll();
      return res.status(HttpStatus.OK).json(videos)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }
}
