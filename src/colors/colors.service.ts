import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { UpdateColorDto } from './dto/update-color.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ColorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(req: Request, paletteId: number) {
    const userId = req.user.id;

    try {
      const colors = await this.prisma.color.findMany({
        where: { paletteId, palette: { userId } },
      });

      if (!colors || colors.length === 0) {
        throw new HttpException('No colors found', HttpStatus.BAD_REQUEST);
      }

      return colors;
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

  async findOne(req: Request, paletteId: number, id: number) {
    const userId = req.user.id;

    try {
      const color = await this.prisma.color.findUnique({
        where: { id, paletteId, palette: { userId } },
      });

      if (!color) {
        throw new HttpException('No color found', HttpStatus.BAD_REQUEST);
      }

      return color;
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

  async update(
    req: Request,
    paletteId: number,
    id: number,
    updateColorDto: UpdateColorDto,
  ) {
    const userId = req.user.id;

    try {
      const color = await this.prisma.color.update({
        where: { id, paletteId, palette: { userId } },
        data: updateColorDto,
      });

      if (!color) {
        throw new HttpException('No color found', HttpStatus.BAD_REQUEST);
      }

      return color;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Internal server error' + error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async remove(req: Request, paletteId: number, id: number) {
    const userId = req.user.id;

    try {
      const color = await this.prisma.color.delete({
        where: { id, paletteId, palette: { userId } },
      });

      if (!color) {
        throw new HttpException('No color found', HttpStatus.BAD_REQUEST);
      }

      return color;
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
