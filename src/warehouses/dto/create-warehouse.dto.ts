import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateWarehouseDto {
  @ApiProperty({ description: 'Warehouse name', example: 'Main Warehouse' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Warehouse location',
    example: '123 Warehouse Rd, City, Country',
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Contact email for the warehouse',
    example: 'contact@warehouse.com',
  })
  @IsEmail()
  contactEmail: string;

  @ApiProperty({ description: 'Is the warehouse active?', example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;

  @ApiProperty({
    description: 'Description of the warehouse',
    example: 'Main storage facility',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
