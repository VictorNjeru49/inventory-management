import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesController } from './warehouses.controller';
import { DatabaseModule } from '../database/database.module';
import { Warehouse } from './entities/warehouse.entity';
import { Inventory } from '../inventory/entities/inventory.entity';
import { Product } from '../products/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Warehouse, Inventory, Product]),
  ],
  controllers: [WarehousesController],
  providers: [WarehousesService, RoleGuard],
})
export class WarehousesModule {}
