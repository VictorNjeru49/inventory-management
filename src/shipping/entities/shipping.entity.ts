import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ShippingStatus {
  PENDING = 'pending',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  RETURNED = 'returned',
}
@Entity()
export class Shipping {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  orderId: number;
  @Column()
  trackingNumber: string;
  @Column({
    type: 'enum',
    enum: ShippingStatus,
    default: ShippingStatus.PENDING,
  })
  status: ShippingStatus;
  @Column()
  shippedAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
