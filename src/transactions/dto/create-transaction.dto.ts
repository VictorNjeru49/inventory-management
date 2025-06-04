import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNumber()
  productId: number;
  @ApiProperty()
  @IsNumber()
  quantity: number;
  @ApiProperty()
  @IsEnum(TransactionType)
  transaction_type: TransactionType;
  @ApiProperty()
  @IsOptional()
  @IsDate()
  createdAt?: Date;
}
