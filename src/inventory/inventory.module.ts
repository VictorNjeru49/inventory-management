import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Product } from '../products/entities/product.entity';
import { Warehouse } from '../warehouses/entities/warehouse.entity';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Inventory, Product, Warehouse, User]),
  ],
  controllers: [InventoryController],
  providers: [InventoryService, RoleGuard],
})
export class InventoryModule {}
