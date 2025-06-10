import { Module } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([OrderItem, Order, Product]),
  ],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, RoleGuard],
})
export class OrderItemsModule {}
