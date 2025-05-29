import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Transaction } from '../transactions/entities/transaction.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Payment, Transaction])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
