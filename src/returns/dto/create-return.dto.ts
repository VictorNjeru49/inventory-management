import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { ReturnStatus } from '../entities/return.entity';

export class CreateReturnDto {
  @IsNumber()
  orderId: number;
  @IsNumber()
  productId: number;
  @IsNumber()
  quantity: number;
  @IsString()
  returnReason: string;
  @IsEnum(ReturnStatus)
  returnStatus: ReturnStatus; // e.g., 'pending', 'approved', 'rejected'
  @IsDate()
  createdAt: Date; // Defaults to current timestamp
}
