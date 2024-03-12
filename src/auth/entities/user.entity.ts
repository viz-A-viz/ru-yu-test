import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user_name' })
  username: string;

  @ApiProperty({ example: 'Firstname' })
  firstName: string;

  @Exclude()
  password: string;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
}
