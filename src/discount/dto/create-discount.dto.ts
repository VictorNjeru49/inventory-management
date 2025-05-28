import { IsNumber } from 'class-validator';

export class CreateDiscountDto {
  @IsNumber()
  noDiscount: number;
  @IsNumber()
  partial: number;
  @IsNumber()
  promotional: number;
  @IsNumber()
  loyalty: number;
}
