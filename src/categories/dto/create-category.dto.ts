import { IsString, IsDate } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsDate()
  createdAt: Date;
}
