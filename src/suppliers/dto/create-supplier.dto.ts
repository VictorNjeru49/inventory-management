import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  name: string;
  @IsNumber()
  contactInfo: number;
  @IsString()
  address: string;
  @IsDate()
  createdAt: Date;
}
