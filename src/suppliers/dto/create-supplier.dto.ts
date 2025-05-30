import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  name: string;
  @IsNumber()
  contactInfo: string;
  @IsString()
  address: string;
  @IsDate()
  createdAt: Date;
}
