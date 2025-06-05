import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { Inventory } from '../inventory/entities/inventory.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { Warehouse } from '../warehouses/entities/warehouse.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { Shipping } from '../shipping/entities/shipping.entity';
import { Payment } from '../payments/entities/payment.entity';
import { Return } from '../returns/entities/return.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Register } from '../register/entities/register.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Category,
      Product,
      Inventory,
      Supplier,
      Warehouse,
      Order,
      OrderItem,
      Shipping,
      Payment,
      Return,
      Transaction,
      Register,
    ]),
  ],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
