import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { ShippingStatus } from '../entities/shipping.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShippingDto {
  @ApiProperty()
  @IsNumber()
  orderId: number;
  @ApiProperty()
  @IsString()
  trackingNumber: string;
  @ApiProperty()
  @IsEnum(ShippingStatus)
  status: ShippingStatus;
  @ApiProperty()
  @IsDate()
  shippedAt: Date;
  @ApiProperty()
  @IsDate()
  createdAt: Date;
}
