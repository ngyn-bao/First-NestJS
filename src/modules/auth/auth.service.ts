import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/common/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { TUserExist } from 'src/common/@type/user-exist-type';
import {
  ACCESS_TOKEN_EXPIRE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE,
  REFRESH_TOKEN_SECRET,
} from 'src/common/constant/config.constant';
import { JwtService } from '@nestjs/jwt';
import LoginDto from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(req: Request) {
    // return 'Login successfully'
    console.log(req);
    let { email, pass_word } = req.body;
    console.log(email, pass_word);

    // b2: kiểm tra email có trong hệ thống hay không? 2 TH
    const userExist = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
      select: {
        pass_word: true,
        email: true,
        user_id: true,
      },
    });
    //kĩ thuật ngắt dòng
    if (!userExist) {
      throw new BadRequestException(
        'Không tìm thấy tài khoản, vui lòng đăng kí nhé!',
      );
    }
    //bước 3 kiểm tra password;
    const isValidPassword = bcrypt.compareSync(pass_word, userExist.pass_word);
    if (!isValidPassword) {
      throw new BadRequestException('Sai mật khẩu rồi bạn eei!');
    }
    //bước 4: tạo token với jwt //accessToken và refreshToken
    const tokens = this.createToken(userExist);
    return tokens;
  }

  createToken(user: TUserExist) {
    const accessToken = this.jwt.sign(
      {
        user: user.user_id,
      },
      {
        secret: ACCESS_TOKEN_SECRET,
        expiresIn: ACCESS_TOKEN_EXPIRE,
      },
    ); // => nhiệm vụ : prove user đã logged in

    //refresh => thời hạn lâu hơn tk accessToken ,
    const refreshToken = this.jwt.sign(
      {
        user: user.user_id,
      },
      {
        secret: REFRESH_TOKEN_SECRET,
        expiresIn: REFRESH_TOKEN_EXPIRE,
      },
    ); // => nhiệm vụ : prove user đã logged in
    console.log(accessToken, refreshToken);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
