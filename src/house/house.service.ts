import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import { House } from './entities/house.entity';
import { CreateHouseDto } from './dto/create-house.dto';
import { User } from '../users/entities/user.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private readonly houseRepository: Repository<House>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateHouseDto) {
    const house = this.houseRepository.create({ ...dto, criadaEm: new Date() });
    const saved = await this.houseRepository.save(house);

    await Promise.all(
      dto.membros.map(userId =>
        this.userRepository.update(userId, { casaId: saved._id.toString() })
      )
    );

    return saved;
  }

  async findAllByUser(userId: string) {
    return this.houseRepository.find({
      where: {
        membros: Raw((alias) => `JSON_CONTAINS(${alias}, '"${userId}"')`),
      },
    });
  }

  async joinHouse(houseId: string, userId: string) {
    const house = await this.houseRepository.findOne({ where: { _id: new ObjectId(houseId) } });
    if (!house) {
      throw new NotFoundException('Casa não encontrada');
    }
    if (house.membros.includes(userId)) {
      throw new BadRequestException('Usuário já está na casa');
    }
    house.membros.push(userId);
    await this.houseRepository.save(house);
    await this.userRepository.update(userId, { casaId: house._id.toString() });
    return { message: 'Usuário adicionado à casa com sucesso' };
  }
}
