import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

export class CreateTransactionDto {
  @IsNumber()
  productId: number; // Foreign key to User entity
  @IsNumber()
  quantity: number;
  @IsEnum(TransactionType)
  transaction_type: TransactionType; // e.g., 'credit', 'debit'
  @IsOptional()
  @IsDate()
  createdAt?: Date; // Optional, defaults to current date if not provided
}
