import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty()
  @IsNumber()
  productId: number;
  @ApiProperty()
  @IsNumber()
  warehouseId: number;
  @ApiProperty()
  @IsNumber()
  stockQty: number;
  @ApiProperty()
  @IsDate()
  createdAt: Date;
}
