import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({ description: 'Product ID', example: 1 })
  @IsNumber()
  productId: number;

  @ApiProperty({ description: 'Warehouse ID', example: 2 })
  @IsNumber()
  warehouseId: number;

  @ApiProperty({ description: 'Quantity in stock', example: 100 })
  @IsNumber()
  stockQty: number;

  @ApiProperty({ description: 'Creation date', example: '2023-05-02' })
  @IsDate()
  createdAt: Date;
}
