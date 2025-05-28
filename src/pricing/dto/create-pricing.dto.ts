import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreatePricingDto {
  @IsNumber()
  price: number;
  @IsNumber()
  discountId: number;
  @IsString()
  promotion: string;
  @IsDate()
  startDate: Date;
  @IsDate()
  endDate: Date;
}
