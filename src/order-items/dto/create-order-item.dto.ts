import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({ description: 'orders booked', example: '3' })
  @IsNumber()
  orderId: number;
  @ApiProperty({ description: 'product booked', example: '4' })
  @IsNumber()
  productId: number;
  @ApiProperty({ description: 'amounted booked', example: '5' })
  @IsNumber()
  quantity: number;
  @ApiProperty({ description: 'price for each item', example: '5' })
  @IsNumber()
  price: number;
  @ApiProperty({ description: 'sum of the items booked', example: '5' })
  @IsNumber()
  totalPrice: number;
}
