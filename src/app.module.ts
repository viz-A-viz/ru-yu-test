import { Module } from '@nestjs/common';
import { PaletteModule } from './palette/palette.module';
import { ColorsModule } from './colors/colors.module';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    PaletteModule,
    ColorsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}
