import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ReturnStatus } from '../entities/return.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReturnDto {
  @ApiProperty({
    description: 'Order ID associated with the return',
    example: 123,
  })
  @IsNumber()
  orderId: number;

  @ApiProperty({ description: 'Product ID being returned', example: 456 })
  @IsNumber()
  productId: number;

  @ApiProperty({
    description: 'Quantity of the product being returned',
    example: 2,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Reason for the return',
    example: 'Defective item',
  })
  @IsString()
  returnReason: string;

  @ApiProperty({
    description: 'Current status of the return',
    enum: ReturnStatus,
    example: ReturnStatus.PENDING,
  })
  @IsEnum(ReturnStatus)
  returnStatus: ReturnStatus; // e.g., 'pending', 'approved', 'rejected'
}
