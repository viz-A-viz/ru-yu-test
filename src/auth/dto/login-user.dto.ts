import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'user_name' })
  @IsString()
  readonly username: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  readonly password: string;
}
