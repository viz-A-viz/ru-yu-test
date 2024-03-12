import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePaletteDto {
  @ApiProperty({ example: 'new_palette_name' })
  @IsString()
  @IsOptional()
  readonly name?: string;
}
