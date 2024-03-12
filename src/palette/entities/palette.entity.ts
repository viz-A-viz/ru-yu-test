import { Palette } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class PaletteEntity implements Palette {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'palette_name' })
  name: string;

  @Exclude()
  userId: number;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
}
