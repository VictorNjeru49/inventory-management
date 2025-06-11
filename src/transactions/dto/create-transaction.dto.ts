import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
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

  @ApiProperty({
    description: 'Creation date of the transaction',
    example: '2023-06-01',
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;
}
