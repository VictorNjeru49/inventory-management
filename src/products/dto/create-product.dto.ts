import { IsNumber, IsString, IsDate } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string; // Product name
  @IsString()
  description: string; // Product description
  @IsString()
  sku: string; // Stock Keeping Unit, a unique identifier for the product
  @IsNumber()
  price: number; // Product price
  @IsNumber()
  categoryId: number; // Product category
  @IsNumber()
  supplierId: number; // Supplier ID
  @IsNumber()
  stockQuantity: number; // Available stock quantity
  @IsDate()
  createdAt?: Date; // Timestamp when the product was created, defaults to current timestamp
  @IsDate()
  updatedAt?: Date; // Timestamp when the product was last updated, defaults to current timestamp}
}
