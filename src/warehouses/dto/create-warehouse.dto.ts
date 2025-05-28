import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateWarehouseDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsEmail()
  contactEmail: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;

  @IsOptional()
  @IsString()
  description?: string;
}
