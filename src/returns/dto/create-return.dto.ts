import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { ReturnStatus } from '../entities/return.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReturnDto {
  @ApiProperty()
  @IsNumber()
  orderId: number;
  @ApiProperty()
  @IsNumber()
  productId: number;
  @ApiProperty()
  @IsNumber()
  quantity: number;
  @ApiProperty()
  @IsString()
  returnReason: string;
  @ApiProperty()
  @IsEnum(ReturnStatus)
  returnStatus: ReturnStatus; // e.g., 'pending', 'approved', 'rejected'
  @ApiProperty()
  @IsDate()
  createdAt: Date; // Defaults to current timestamp
}
