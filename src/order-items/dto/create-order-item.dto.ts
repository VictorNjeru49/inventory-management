import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({ description: 'Order ID', example: 3 })
  @IsNumber()
  orderId: number;

  @ApiProperty({ description: 'Product ID', example: 4 })
  @IsNumber()
  productId: number;

  @ApiProperty({ description: 'Quantity ordered', example: 5 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Price per item', example: 5 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Total price for the items', example: 25 })
  @IsNumber()
  totalPrice: number;
}
