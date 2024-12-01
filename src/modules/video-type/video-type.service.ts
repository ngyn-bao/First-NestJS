import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TVideoType } from 'src/common/@type/video-type';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class VideoTypeService {
  constructor(private readonly prisma: PrismaService) {}
  async getVideoType(page: number, pageSize: number) {
    // const videoTypes = await this.prisma.video_type.findMany();
    // return videoTypes;
    //let { page, pageSize } = req.query; // param, body, header
    console.log(page, pageSize);
    // pageSize = Number(pageSize);
    // pageIndex = Number(pageIndex);
    pageSize = +pageSize > 0 ? +pageSize : 3;
    page = +page > 0 ? +page : 1;
    const skip = (page - 1) * pageSize;
    // console.log(req.query, skip);
    const totalItems = await this.prisma.videos.count();
    const totalPages = Math.ceil(totalItems / pageSize);
    const results = await this.prisma.videos.findMany({
      take: pageSize,
      skip: skip,
      orderBy: {
        created_at: 'desc',
      },
    });
    return {
      page,
      pageSize,
      totalPages: totalPages,
      totalItems: totalItems,
      items: results || [],
    };
  }

  async getVideoTypeById(id: string) {
    const videoTypeDetail = await this.prisma.video_type.findUnique({
      where: {
        type_id: Number(id),
      },
    });
    return videoTypeDetail;
  }

  async createVideoType(body: TVideoType) {
    const newVideoType = await this.prisma.video_type.create({
      data: {
        type_name: body.type_name,
        icon: body.icon,
      },
    });
    return newVideoType;
  }
}
