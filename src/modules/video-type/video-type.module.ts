import { Module } from '@nestjs/common';
import { VideoTypeController } from './video-type.controller';
import { VideoTypeService } from './video-type.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  controllers: [VideoTypeController],
  providers: [VideoTypeService, PrismaService, JwtStrategy],
})
export class VideoTypeModule {}
