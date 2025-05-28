import { IsEnum, IsNumber, IsString } from 'class-validator';
import { PaymentMethod, PaymentStatus } from '../entities/payment.entity';

export class CreatePaymentDto {
  @IsNumber()
  amount: number;
  @IsString()
  currency: string;
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
  @IsNumber()
  inventoryId: number;
  @IsNumber()
  userId: number;
  @IsNumber()
  orderId: number;
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
  @IsNumber()
  transactionId: number; // Optional field for transaction ID
}
