import { PartialType } from '@nestjs/mapped-types';
import { CreatePricingDto } from './create-pricing.dto';
import { IsNumber } from 'class-validator';

export class UpdatePricingDto extends PartialType(CreatePricingDto) {
  @IsNumber()
  id: number;
}
