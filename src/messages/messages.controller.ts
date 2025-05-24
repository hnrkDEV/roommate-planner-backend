import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() dto: CreateMessageDto, @CurrentUser() user) {
    return this.messagesService.create(dto.texto, user.userId, user.casaId);
  }

  @Get()
  findAll(@CurrentUser() user) {
    return this.messagesService.findAllByCasaId(user.casaId);
  }
}