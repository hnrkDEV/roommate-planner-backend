import { Controller, Get, Post, Body, UseGuards, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() body: CreateTaskDto, @CurrentUser() user) {
    return this.tasksService.create({
      ...body,
      casaId: user.casaId,
      atribuidaPara: body.atribuidaPara || user.userId,
      status: 'pendente',
      dataLimite: new Date(body.dataLimite),
    });
  }

  @Get()
  findAll(@CurrentUser() user) {
    return this.tasksService.findAllByCasaId(user.casaId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: 'pendente' | 'concluida') {
    return this.tasksService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}