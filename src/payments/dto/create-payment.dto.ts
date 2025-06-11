import { IsEnum, IsNumber, IsString } from 'class-validator';
import { PaymentMethod, PaymentStatus } from '../entities/payment.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ description: 'Payment amount', example: 100 })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Currency type', example: 'USD' })
  @IsString()
  currency: string;

  @ApiProperty({ description: 'Payment method', example: 'CREDIT_CARD' })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({
    description: 'Inventory ID associated with the payment',
    example: 1,
  })
  @IsNumber()
  inventoryId: number;

  @ApiProperty({ description: 'User ID making the payment', example: 123 })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'Order ID associated with the payment',
    example: 456,
  })
  @IsNumber()
  orderId: number;

  @ApiProperty({ description: 'Payment status', example: 'COMPLETED' })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @ApiProperty({ description: 'Transaction ID', example: 789 })
  @IsNumber()
  transactionId: number;
}
