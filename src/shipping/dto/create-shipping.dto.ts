import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { ShippingStatus } from '../entities/shipping.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShippingDto {
  @ApiProperty({
    description: 'Order ID associated with the shipping',
    example: 456,
  })
  @IsNumber()
  orderId: number;

  @ApiProperty({
    description: 'Tracking number for the shipment',
    example: 'TRACK12345',
  })
  @IsString()
  trackingNumber: string;

  @ApiProperty({ description: 'Shipping status', example: 'SHIPPED' })
  @IsEnum(ShippingStatus)
  status: ShippingStatus;

  @ApiProperty({
    description: 'Date when the order was shipped',
    example: '2023-06-01',
  })
  @IsDate()
  shippedAt: Date;

  @ApiProperty({
    description: 'Creation date of the shipping record',
    example: '2023-06-01',
  })
  @IsDate()
  createdAt: Date;
}
