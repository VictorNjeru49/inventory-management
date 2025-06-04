import { PartialType } from '@nestjs/mapped-types';
import { CreateShippingDto } from './create-shipping.dto';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateShippingDto extends PartialType(CreateShippingDto) {
  @ApiProperty()
  @IsNumber()
  id: number;
}
