import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { Shipping } from '../shipping/entities/shipping.entity';
import { Return } from '../returns/entities/return.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Order, User, Shipping, Return, OrderItem]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, RoleGuard],
})
export class OrdersModule {}
