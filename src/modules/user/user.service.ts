import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UploadAvatarDto } from './dto/upload-avatar-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds ';
  }

  async findAll(page: number, pageSize: number) {
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async uploadAvatar(avatar: Express.Multer.File) {
    console.log(avatar);
    return 'Hello';
  }
}
