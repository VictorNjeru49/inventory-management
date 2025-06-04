import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNumber()
  contactInfo: string;
  @ApiProperty()
  @IsString()
  address: string;
  @ApiProperty()
  @IsDate()
  createdAt: Date;
}
