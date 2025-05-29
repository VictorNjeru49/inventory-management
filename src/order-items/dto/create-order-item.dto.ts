import { IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsNumber()
  orderId: number;
  @IsNumber()
  productId: number;
  @IsNumber()
  quantity: number;
  @IsNumber()
  price: number;
  @IsNumber()
  totalPrice: number;
}
