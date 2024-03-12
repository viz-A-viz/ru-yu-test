import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({ example: 'header.payload.signature' })
  readonly token: string;
}
