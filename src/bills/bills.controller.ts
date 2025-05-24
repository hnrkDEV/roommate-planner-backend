import { Controller, Get, Post, Body, UseGuards, Param, Patch } from '@nestjs/common';
import { BillsService } from './bills.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateBillDto } from './dto/create-bill.dto';

@Controller('bills')
@UseGuards(JwtAuthGuard)
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  create(@Body() dto: CreateBillDto, @CurrentUser() user) {
    return this.billsService.create(dto, user.casaId);
  }

  @Get()
  findAll(@CurrentUser() user) {
    return this.billsService.findAllByCasaId(user.casaId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: 'paga' | 'pendente') {
    return this.billsService.updateStatus(id, status);
  }
}
