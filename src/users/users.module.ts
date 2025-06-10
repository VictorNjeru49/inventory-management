import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Order } from '../orders/entities/order.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Return } from '../returns/entities/return.entity';
import { Register } from '../register/entities/register.entity';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, Order, Transaction, Return, Register]),
  ],
  controllers: [UsersController],
  providers: [UsersService, RoleGuard],
})
export class UsersModule {}
