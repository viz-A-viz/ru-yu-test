import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { TokenDto } from './dto/token.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: TokenDto })
  @Post('/login')
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 200, type: TokenDto })
  @Post('/register')
  register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }
}
