import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  create(data: Partial<Task>) {
    const task = this.taskRepository.create(data);
    return this.taskRepository.save(task);
  }

  findAllByCasaId(casaId: string) {
    return this.taskRepository.find({ where: { casaId } });
  }

  async updateStatus(id: string, status: 'pendente' | 'concluida') {
    const task = await this.taskRepository.findOne({ where: { _id: new ObjectId(id) } });
    if (!task) throw new NotFoundException('Tarefa não encontrada');
    task.status = status;
    return this.taskRepository.save(task);
  }

  async remove(id: string) {
    const task = await this.taskRepository.findOne({ where: { _id: new ObjectId(id) } });
    if (!task) throw new NotFoundException('Tarefa não encontrada');
    return this.taskRepository.remove(task);
  }
}
