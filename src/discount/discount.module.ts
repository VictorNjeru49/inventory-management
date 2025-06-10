import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './entities/discount.entity';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Discount])],
  controllers: [DiscountController],
  providers: [DiscountService, RoleGuard],
})
export class DiscountModule {}
