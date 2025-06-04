import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ description: 'users orders', example: '123456765432erfvft65' })
  @IsNumber()
  userId: number;
  @ApiProperty({ description: 'total price', example: '234.88' })
  @IsNumber()
  totalPrice: number;
}
