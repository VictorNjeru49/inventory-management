import { Payment } from '../../payments/entities/payment.entity';
import { Order } from '../../orders/entities/order.entity';
import { User } from '../../users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Relation,
  OneToMany,
  JoinColumn,
} from 'typeorm';

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
  quantity: number;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  orderId: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.SALE,
  })
  transaction_type: TransactionType;

  @ManyToOne(() => User, (user) => user.transactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @ManyToOne(() => Order, (order) => order.transactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' })
  order: Relation<Order>;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Payment, (payment) => payment.transaction, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  payments: Payment[];
}
