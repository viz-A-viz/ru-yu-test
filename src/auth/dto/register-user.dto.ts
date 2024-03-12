import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'firstName' })
  @IsString()
  readonly firstName: string;

  @ApiProperty({ example: 'user_name' })
  @IsString()
  readonly username: string;

  @ApiProperty({ example: 'password' })
  @IsStrongPassword()
  readonly password: string;
}
