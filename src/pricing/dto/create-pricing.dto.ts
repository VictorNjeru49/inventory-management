import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreatePricingDto {
  @ApiProperty()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsNumber()
  discountId: number;
  @ApiProperty()
  @IsString()
  promotion: string;
  @ApiProperty()
  @IsDate()
  startDate: Date;
  @ApiProperty()
  @IsDate()
  endDate: Date;
}
