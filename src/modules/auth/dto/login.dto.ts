import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
class LoginDto {
  @IsString()
  @ApiProperty()
  email: string;
  @IsString()
  @ApiProperty()
  pass_word: string;
}

export default LoginDto;
