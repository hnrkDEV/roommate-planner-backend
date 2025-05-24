import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@CurrentUser() user) {
    const data = await this.usersService.findById(user.userId);
    console.log('👤 Enviando para o client:', data);
    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllFromSameHouse(@CurrentUser() user) {
    return this.usersService.findAllByHouseId(user.casaId);
  }
}
