import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { query } from 'express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadAvatarDto } from './dto/upload-avatar-user.dto';
import storage from 'src/common/multer/handle-upload-local.multer';
import storageLocal from 'src/common/multer/handle-upload-local.multer';
import storageCloud from 'src/common/multer/handel-upload-cloud.multer';

@Controller('user')
@ApiTags('User Nè')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('get-all')
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.userService.findAll(page, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('avatar-local')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: storageLocal,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: UploadAvatarDto,
  })
  uploadAvatarLocal(@UploadedFile() fileUpload: Express.Multer.File) {
    return this.userService.uploadAvatar(fileUpload);
  }

  @Post('avatar-cloud')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: storageCloud,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: UploadAvatarDto,
  })
  uploadAvatarCloud(@UploadedFile() fileUpload: Express.Multer.File) {
    return this.userService.uploadAvatar(fileUpload);
  }
}
