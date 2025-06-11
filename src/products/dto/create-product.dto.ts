import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'Laptop' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Product description',
    example: 'High performance laptop',
  })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Stock Keeping Unit', example: 'SKU1234' })
  @IsString()
  sku: string;

  @ApiProperty({ description: 'Product price', example: 999.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Category ID', example: 1 })
  @IsNumber()
  categoryId: number;

  @ApiProperty({ description: 'Supplier ID', example: 2 })
  @IsNumber()
  supplierId: number;

  @ApiProperty({ description: 'Stock quantity', example: 50 })
  @IsNumber()
  stockQuantity: number;

  @ApiProperty({ description: 'Creation date', example: '2023-05-02' })
  @IsDate()
  createdAt?: Date;

  @ApiProperty({ description: 'Update date', example: '2023-06-01' })
  @IsDate()
  updatedAt?: Date;
}
