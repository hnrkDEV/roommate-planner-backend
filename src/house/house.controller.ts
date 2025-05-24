import { Controller, Post, Body, Get, UseGuards, Param, Patch } from '@nestjs/common';
import { HouseService } from './house.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateHouseDto } from './dto/create-house.dto';

@Controller('houses')
@UseGuards(JwtAuthGuard)
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post()
  create(@Body() dto: CreateHouseDto) {
    return this.houseService.create(dto);
  }

  @Get()
  findAll(@CurrentUser() user) {
    return this.houseService.findAllByUser(user.userId);
  }

  @Patch(':id/join')
  joinHouse(@Param('id') houseId: string, @CurrentUser() user) {
    return this.houseService.joinHouse(houseId, user.userId);
  }
}