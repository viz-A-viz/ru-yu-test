import { Module } from '@nestjs/common';
import { PaletteService } from './palette.service';
import { PaletteController } from './palette.controller';
import { PrismaService } from '../prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PaletteController],
  providers: [PaletteService, PrismaService, JwtAuthGuard],
  imports: [AuthModule],
})
export class PaletteModule {}
