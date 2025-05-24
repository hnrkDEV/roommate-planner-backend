import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from '../users/dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(senha, user.senha)) {
      const { senha, ...result } = user;
      return result;
    }
    return null;
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.senha, user.senha))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const payload = { sub: user._id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
}

  async register(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.senha, 10);
    const newUser = await this.usersService.create({
      ...dto,
      senha: hashedPassword,
    });
    const payload = { sub: newUser._id, email: newUser.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}