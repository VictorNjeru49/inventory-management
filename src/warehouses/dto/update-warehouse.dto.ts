import { PartialType } from '@nestjs/mapped-types';
import { CreateWarehouseDto } from './create-warehouse.dto';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWarehouseDto extends PartialType(CreateWarehouseDto) {
  @ApiProperty()
  @IsNumber()
  id: number;
}
