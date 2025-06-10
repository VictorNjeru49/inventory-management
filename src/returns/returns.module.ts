import { Module } from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { ReturnsController } from './returns.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Return } from './entities/return.entity';
import { Product } from '../products/entities/product.entity';
import { Order } from '../orders/entities/order.entity';
import { User } from '../users/entities/user.entity';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Return, Product, Order, User]),
  ],
  controllers: [ReturnsController],
  providers: [ReturnsService, RoleGuard],
})
export class ReturnsModule {}
