import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsEnum, IsNotEmpty } from "class-validator";
import { VideoType } from "../enum/video_type.enum";

export class CreateVideoDto {
@IsNotEmpty({message: "video name is not empty"})
@ApiProperty() // show property
  video_name: string;

  @IsNotEmpty({message: "video is not empty"})
@ApiProperty() // show property
  thumbnail: string;

  @IsNotEmpty({message: "video is not empty"})
  @ApiProperty() // show property
  description: string;

  @ApiProperty() 
  views: number;

  @IsNotEmpty({message: "video is not empty"})
  @ApiProperty()
  source: string;

  user_id: number;


  @ApiProperty({enum: VideoType})
  @IsEnum(VideoType)
  type_id: number;

}
