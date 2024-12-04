import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Response } from 'express';
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    create(createVideoDto: CreateVideoDto, res: Response): Response<any, Record<string, any>>;
    findAll(page: string, size: string, keyword: string, res: Response, token: string): Promise<any>;
    findOne(id: string): string;
    update(id: string, updateVideoDto: UpdateVideoDto): string;
    remove(id: string): string;
}
