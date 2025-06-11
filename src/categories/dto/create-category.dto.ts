import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Category name', example: 'Waffles' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Short description', example: 'Fast spoilt' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Manufacture timestamp', example: '2023-05-02' })
  @IsDate()
  createdAt: Date;
}
