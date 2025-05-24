import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { House } from './entities/house.entity';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([House, User])],
  controllers: [HouseController],
  providers: [HouseService],
})
export class HouseModule {}