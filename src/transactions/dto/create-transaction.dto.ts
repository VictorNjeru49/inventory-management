import { IsEnum, IsNumber } from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Product ID involved in the transaction',
    example: 1,
  })
  @IsNumber()
  productId: number;

  @ApiProperty({
    description: 'Quantity involved in the transaction',
    example: 10,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Type of transaction', example: 'PURCHASE' })
  @IsEnum(TransactionType)
  transaction_type: TransactionType;
}
