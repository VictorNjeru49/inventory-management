import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pricing } from './entities/pricing.entity';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Pricing, User])],
  controllers: [PricingController],
  providers: [PricingService, RoleGuard],
})
export class PricingModule {}
