import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Order } from '../orders/entities/order.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Return } from '../returns/entities/return.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, Order, Transaction, Return]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
