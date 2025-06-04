import { PartialType } from '@nestjs/mapped-types';
import { CreatePricingDto } from './create-pricing.dto';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePricingDto extends PartialType(CreatePricingDto) {
  @ApiProperty()
  @IsNumber()
  id: number;
}
