import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { PaletteService } from './palette.service';
import { UpdatePaletteDto } from './dto/update-palette.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaletteEntity } from './entities/palette.entity';
import { plainToInstance } from 'class-transformer';

@Controller('palette')
@ApiTags('Palette')
@UseGuards(JwtAuthGuard)
export class PaletteController {
  constructor(private readonly paletteService: PaletteService) {}

  @Get()
  @ApiOperation({ summary: 'Get all user`s palettes' })
  @ApiResponse({ status: 200, type: PaletteEntity, isArray: true })
  async findAll(@Req() req: Request): Promise<PaletteEntity[]> {
    const result = await this.paletteService.findAll(req);
    return plainToInstance(PaletteEntity, result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user`s palette' })
  @ApiResponse({ status: 200, type: PaletteEntity })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ): Promise<PaletteEntity> {
    const result = await this.paletteService.findOne(req, id);
    return plainToInstance(PaletteEntity, result);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user`s palette' })
  @ApiResponse({ status: 200, type: PaletteEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaletteDto: UpdatePaletteDto,
    @Req() req: Request,
  ): Promise<PaletteEntity> {
    const result = await this.paletteService.update(req, id, updatePaletteDto);
    return plainToInstance(PaletteEntity, result);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user`s palette' })
  @ApiResponse({ status: 200, type: PaletteEntity })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ): Promise<PaletteEntity> {
    const result = await this.paletteService.remove(req, id);
    return plainToInstance(PaletteEntity, result);
  }
}
