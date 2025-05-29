import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipping } from './entities/shipping.entity';
import { Order } from '../orders/entities/order.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Shipping, Order])],
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class ShippingModule {}
