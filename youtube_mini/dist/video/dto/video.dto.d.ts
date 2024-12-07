export declare class VideoDto {
    video_id: number;
    video_name: string;
    thumbnail: string;
    description: string;
    views: number;
    source: string;
    user_id: number;
    type_id: number;
    constructor(partial: Partial<VideoDto>);
}
