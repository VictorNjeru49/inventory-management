import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ReturnStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
@Entity()
export class Return {
  @PrimaryGeneratedColumn()
  id: number; // Primary key
  @Column()
  orderId: number; // Foreign key to Order
  @Column()
  productId: number; // Foreign key to Product
  @Column()
  quantity: number; // Quantity of the product being returned
  @Column()
  returnReason: string; // Reason for the return
  @Column({ type: 'enum', enum: ReturnStatus, default: ReturnStatus.PENDING })
  returnStatus: ReturnStatus; // Status of the return (e.g., 'pending', 'approved', 'rejected')
  @Column()
  createdAt: Date; // Timestamp when the return was created, defaults to current timestamp
}
