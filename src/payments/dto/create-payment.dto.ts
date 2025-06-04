import { IsEnum, IsNumber, IsString } from 'class-validator';
import { PaymentMethod, PaymentStatus } from '../entities/payment.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNumber()
  amount: number;
  @ApiProperty()
  @IsString()
  currency: string;
  @ApiProperty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
  @ApiProperty()
  @IsNumber()
  inventoryId: number;
  @ApiProperty()
  @IsNumber()
  userId: number;
  @ApiProperty()
  @IsNumber()
  orderId: number;
  @ApiProperty()
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
  @ApiProperty()
  @IsNumber()
  transactionId: number; // Optional field for transaction ID
}
