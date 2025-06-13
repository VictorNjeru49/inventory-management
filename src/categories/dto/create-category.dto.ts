import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Category name', example: 'Waffles' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Short description', example: 'Fast spoilt' })
  @IsString()
  description: string;
}
