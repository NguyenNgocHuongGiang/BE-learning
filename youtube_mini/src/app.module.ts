import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import {ConfigModule} from '@nestjs/config'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    VideoModule, 
    ConfigModule.forRoot({isGlobal: true}), AuthModule // load bien moi truong
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
