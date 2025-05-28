import { PrimaryGeneratedColumn, Column } from 'typeorm';

export enum OrderStatus {
  Pending = 'pending',
  Completed = 'completed',
  Shipped = 'shipped',
  Returned = 'returned',
}

export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  orderId: number;
  @Column()
  userId: number;
  @Column()
  totalPrice: number;
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  status: OrderStatus;
}
