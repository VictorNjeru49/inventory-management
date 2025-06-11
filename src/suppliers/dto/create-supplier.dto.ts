import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({ description: 'Supplier name', example: 'ABC Supplies' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Contact information', example: '123456789' })
  @IsNumber()
  contactInfo: string;

  @ApiProperty({
    description: 'Supplier address',
    example: '123 Main St, City, Country',
  })
  @IsString()
  address: string;

  @ApiProperty({ description: 'Creation date', example: '2023-05-02' })
  @IsDate()
  createdAt: Date;
}
