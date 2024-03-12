import { Color } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class ColorEntity implements Color {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '#000000' })
  hex: string;

  @ApiProperty({ example: 'black' })
  name: string;

  @Exclude()
  paletteId: number;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
}
