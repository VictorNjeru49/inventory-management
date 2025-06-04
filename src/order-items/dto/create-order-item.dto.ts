import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({ description: 'orders booked', example: '' })
  @IsNumber()
  orderId: number;
  @ApiProperty({ description: 'product booked', example: '' })
  @IsNumber()
  productId: number;
  @ApiProperty({ description: 'amounted booked', example: '' })
  @IsNumber()
  quantity: number;
  @ApiProperty({ description: 'price for each item', example: '' })
  @IsNumber()
  price: number;
  @ApiProperty({ description: 'sum of the items booked', example: '' })
  @IsNumber()
  totalPrice: number;
}
