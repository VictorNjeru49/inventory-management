import { IsEnum, IsNumber } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  @IsNumber()
  userId: number;
  @IsNumber()
  totalPrice: number;
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
