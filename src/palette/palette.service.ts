import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { UpdatePaletteDto } from './dto/update-palette.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PaletteService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(req: Request) {
    const userId = req.user.id;

    try {
      const palettes = await this.prisma.palette.findMany({
        where: { userId },
      });

      if (!palettes || palettes.length === 0) {
        throw new HttpException(
          'No palettes found for this user',
          HttpStatus.BAD_REQUEST,
        );
      }

      return palettes;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async findOne(req: Request, id: number) {
    const userId = req.user.id;

    try {
      const palette = await this.prisma.palette.findUnique({
        where: { id, userId },
      });

      if (!palette) {
        throw new HttpException(
          'No palette found for this user',
          HttpStatus.BAD_REQUEST,
        );
      }

      return palette;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async update(req: Request, id: number, updatePaletteDto: UpdatePaletteDto) {
    const userId = req.user.id;

    try {
      const palette = await this.prisma.palette.update({
        where: { id, userId },
        data: updatePaletteDto,
      });

      if (!palette) {
        throw new HttpException(
          'No palette found for this user',
          HttpStatus.BAD_REQUEST,
        );
      }

      return palette;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async remove(req: Request, id: number) {
    const userId = req.user.id;

    try {
      const palette = await this.prisma.palette.delete({
        where: { id, userId },
      });

      if (!palette) {
        throw new HttpException(
          'No palette found for this user',
          HttpStatus.BAD_REQUEST,
        );
      }

      return palette;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
