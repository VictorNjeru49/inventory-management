import { Order } from '../../orders/entities/order.entity';
import { User } from '../../users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

export enum TransactionType {
  SALE = 'sale',
  PURCHASE = 'purchase',
  RETURN = 'return',
  ADJUSTMENT = 'adjustment',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  productId: number; // Foreign key to User entity
  @Column()
  userId: number;
  @Column()
  orderId: number;
  @Column()
  quanity: number;
  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.SALE,
  })
  transacrion_type: TransactionType; // e.g., 'credit', 'debit'
  @Column({ default: new Date() })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @ManyToOne(() => Order, (order) => order)
  order: Order;
}
