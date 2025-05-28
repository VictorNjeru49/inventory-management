import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { ShippingStatus } from '../entities/shipping.entity';

export class CreateShippingDto {
  @IsNumber()
  orderId: number; // Unique identifier for the order being shipped
  @IsString()
  trackingNumber: string; // Tracking number for the shipment
  @IsEnum(ShippingStatus)
  status: ShippingStatus; // Status of the shipment (e.g., pending, shipped, delivered)
  @IsDate()
  shippedAt: Date; // Date when the shipment was sent out
  @IsDate()
  createdAt: Date; // Date when the shipping record was created, defaults to current timestamp
}
