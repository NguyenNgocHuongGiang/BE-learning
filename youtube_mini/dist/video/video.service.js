"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const video_dto_1 = require("./dto/video.dto");
const class_transformer_1 = require("class-transformer");
let VideoService = class VideoService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async create(createVideoDto) {
        try {
            let newVideo = await this.prisma.video.create({
                data: createVideoDto
            });
            return (0, class_transformer_1.plainToClass)(video_dto_1.VideoDto, newVideo);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async findAll(page, size, keyword) {
        try {
            let videos = await this.prisma.video.findMany({
                where: keyword ? {
                    video_name: {
                        contains: keyword
                    }
                } : {},
                skip: (page - 1) * size,
                take: size
            });
            return videos.map(video => (0, class_transformer_1.plainToClass)(video_dto_1.VideoDto, video));
        }
        catch (error) {
            throw new Error(error);
        }
    }
    findOne(id) {
        return `This action returns a #${id} video`;
    }
    update(id, updateVideoDto) {
        return `This action updates a #${id} video`;
    }
    remove(id) {
        return `This action removes a #${id} video`;
    }
};
exports.VideoService = VideoService;
exports.VideoService = VideoService = __decorate([
    (0, common_1.Injectable)()
], VideoService);
//# sourceMappingURL=video.service.js.map