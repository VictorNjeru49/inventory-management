import { IsDate, IsNumber } from 'class-validator';

export class CreateInventoryDto {
  @IsNumber()
  productId: number;
  @IsNumber()
  warehouseId: number;
  @IsNumber()
  stockQty: number;
  @IsDate()
  createdAt: Date;
}
