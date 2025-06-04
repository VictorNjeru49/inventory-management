import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderItemDto } from './create-order-item.dto';
import { IsNumber } from 'class-validator';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
  @ApiProperty()
  @IsNumber()
  id: number;
}
