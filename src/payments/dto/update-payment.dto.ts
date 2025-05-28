import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { IsNumber } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @IsNumber()
  id: number;
}
