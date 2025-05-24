import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  create(texto: string, remetenteId: string, casaId: string) {
    const message = this.messageRepository.create({
      texto,
      remetenteId,
      casaId,
      data: new Date(),
    });
    return this.messageRepository.save(message);
  }

  findAllByCasaId(casaId: string) {
    return this.messageRepository.find({ where: { casaId }, order: { data: 'DESC' } });
  }
}
