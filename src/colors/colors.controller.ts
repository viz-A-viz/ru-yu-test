import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { ColorsService } from './colors.service';
import { UpdateColorDto } from './dto/update-color.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColorEntity } from './entities/color.entity';
import { plainToInstance } from 'class-transformer';

@Controller('palette/:paletteId/colors')
@ApiTags('Colors')
@UseGuards(JwtAuthGuard)
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all user`s colors by palette' })
  @ApiResponse({ status: 200, type: ColorEntity, isArray: true })
  async findAll(
    @Req() req: Request,
    @Param('paletteId', ParseIntPipe) paletteId: number,
  ): Promise<ColorEntity[]> {
    const result = await this.colorsService.findAll(req, paletteId);
    return plainToInstance(ColorEntity, result);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get all user`s colors by palette' })
  @ApiResponse({ status: 200, type: ColorEntity, isArray: true })
  async findOne(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Param('paletteId', ParseIntPipe) paletteId: number,
  ) {
    const result = await this.colorsService.findOne(req, paletteId, id);
    return plainToInstance(ColorEntity, result);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Get all user`s colors by palette' })
  @ApiResponse({ status: 200, type: ColorEntity, isArray: true })
  async update(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Param('paletteId', ParseIntPipe) paletteId: number,
    @Body() updateColorDto: UpdateColorDto,
  ) {
    const result = await this.colorsService.update(
      req,
      paletteId,
      id,
      updateColorDto,
    );
    return plainToInstance(ColorEntity, result);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Get all user`s colors by palette' })
  @ApiResponse({ status: 200, type: ColorEntity, isArray: true })
  async remove(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Param('paletteId', ParseIntPipe) paletteId: number,
  ) {
    const result = await this.colorsService.remove(req, paletteId, id);
    return plainToInstance(ColorEntity, result);
  }
}
