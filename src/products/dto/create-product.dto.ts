import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  categoryId: number;

  @ApiProperty()
  @IsNumber()
  supplierId: number;

  @ApiProperty()
  @IsNumber()
  stockQuantity: number;

  @ApiProperty()
  @IsDate()
  createdAt?: Date;

  @ApiProperty()
  @IsDate()
  updatedAt?: Date;
}
