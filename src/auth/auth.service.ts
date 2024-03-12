import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { UserType } from 'src/types/User';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async register(dto: RegisterUserDto) {
    const candidate = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });
    if (candidate) {
      throw new HttpException(
        'User with this username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.prisma.user.create({
      data: { ...dto, password: hashPassword },
      select: { id: true },
    });
    return this.generateToken(user);
  }

  private generateToken(user: UserType) {
    const payload = { ...user };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(dto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });
    if (!user) throw new UnauthorizedException('User is not found');

    const validPassword = await bcrypt.compare(dto.password, user.password);
    if (!validPassword) throw new UnauthorizedException('Incorrect password');

    return {
      id: user.id,
    };
  }
}
