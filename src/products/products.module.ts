import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Inventory } from '../inventory/entities/inventory.entity';
import { Category } from '../categories/entities/category.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { Warehouse } from '../warehouses/entities/warehouse.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      Product,
      Inventory,
      Category,
      OrderItem,
      Supplier,
      Warehouse,
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
