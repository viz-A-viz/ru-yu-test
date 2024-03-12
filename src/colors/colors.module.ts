import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsController } from './colors.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ColorsController],
  providers: [ColorsService, PrismaService],
  imports: [AuthModule],
})
export class ColorsModule {}
