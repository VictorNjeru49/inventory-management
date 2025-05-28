import { PartialType } from '@nestjs/mapped-types';
import { CreateShippingDto } from './create-shipping.dto';
import { IsNumber } from 'class-validator';

export class UpdateShippingDto extends PartialType(CreateShippingDto) {
  @IsNumber()
  id: number; // Unique identifier for the shipping record to be updated
}
