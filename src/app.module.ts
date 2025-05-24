import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HouseModule } from './house/house.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { BillsModule } from './bills/bills.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DATABASE_URL,
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    HouseModule,
    UsersModule,
    TasksModule,
    BillsModule,
    MessagesModule,
  ],
})
export class AppModule {}
