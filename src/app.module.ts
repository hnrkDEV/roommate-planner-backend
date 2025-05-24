import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { HouseController } from './house/house.controller';
import { HouseService } from './house/house.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { BillsController } from './bills/bills.controller';
import { BillsService } from './bills/bills.service';
import { MessagesController } from './messages/messages.controller';
import { MessagesService } from './messages/messages.service';

@Module({
  imports: [],
  controllers: [AppController, AuthController, UsersController, HouseController, TasksController, BillsController, MessagesController],
  providers: [AppService, AuthService, UsersService, HouseService, TasksService, BillsService, MessagesService],
})
export class AppModule {}
