import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pricing } from './entities/pricing.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Pricing])],
  controllers: [PricingController],
  providers: [PricingService],
})
export class PricingModule {}
