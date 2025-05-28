import { PartialType } from '@nestjs/mapped-types';
import { CreateWarehouseDto } from './create-warehouse.dto';
import { IsNumber } from 'class-validator';

export class UpdateWarehouseDto extends PartialType(CreateWarehouseDto) {
  @IsNumber()
  id: number;
}
