import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Supplier, Product])],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
