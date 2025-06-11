import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ description: 'User ID who made the order', example: 123 })
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'Total price of the order', example: 234.88 })
  @IsNumber()
  totalPrice: number;
}
