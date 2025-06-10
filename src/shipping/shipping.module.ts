import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipping } from './entities/shipping.entity';
import { Order } from '../orders/entities/order.entity';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Shipping, Order])],
  controllers: [ShippingController],
  providers: [ShippingService, RoleGuard],
})
export class ShippingModule {}
