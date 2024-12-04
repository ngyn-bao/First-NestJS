import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { VideoTypeService } from './video-type.service';
import { Request } from 'express';
import { TVideoType } from 'src/common/@type/video-type';
import { CreateVideoTypeDto } from './dto/create-video-type.dto';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('video')
@ApiTags('Video Type nè ku')
export class VideoTypeController {
  constructor(private readonly videoTypeService: VideoTypeService) {}

  @ApiConsumes('Video Type Demo')
  @ApiOperation({
    summary: 'Đây là endpoint để lấy list video-type',
    description: 'ABC',
  })
  @Get('video-type')
  async getVideoType(
    @Query('pageIndex') page: number,
    @Query('pageSize') pageSize: number,
    // @Headers('accessToken') accessToken: string,
    @Req() req: Request,
  ) {
    console.log(page, pageSize);
    return await this.videoTypeService.getVideoType(page, pageSize);
  }

  @Get('video-type/:id')
  async getVideoById(@Param('id') id: string) {
    // console.log(id);
    return await this.videoTypeService.getVideoTypeById(id);
  }

  //   create-video-type
  @Post('video-type')
  async createVideoType(@Body() body: CreateVideoTypeDto) {
    return await this.videoTypeService.createVideoType(body);
  }
}
