import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaClient } from '@prisma/client';
import { VideoDto } from './dto/video.dto';
export declare class VideoService {
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    create(createVideoDto: CreateVideoDto): Promise<VideoDto>;
    findAll(page: number, size: number, keyword: string): Promise<VideoDto[]>;
    findOne(id: number): string;
    update(id: number, updateVideoDto: UpdateVideoDto): string;
    remove(id: number): string;
}
