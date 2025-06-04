import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'name of the category', example: 'waffes' })
  @IsString()
  name: string;
  @ApiProperty({ description: 'short description', example: 'fast spoilt' })
  @IsString()
  description: string;
  @ApiProperty({ description: 'timestap manufactured', example: '02-05-2023' })
  @IsDate()
  createdAt: Date;
}
