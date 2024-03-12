import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateColorDto {
  @ApiProperty({ example: 'new_color_name' })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ example: '#000000' })
  @IsString()
  @IsOptional()
  readonly hex?: string;
}
