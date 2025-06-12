import { Return } from '../../returns/entities/return.entity';
import { OrderItem } from '../../order-items/entities/order-item.entity';
import { Shipping } from '../../shipping/entities/shipping.entity';
import { User } from '../../users/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Entity,
  Relation,
  JoinColumn,
} from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Payment } from 'src/payments/entities/payment.entity';

export enum OrderStatus {
  Pending = 'pending',
  Completed = 'completed',
  Shipped = 'shipped',
  Returned = 'returned',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  status: OrderStatus;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  orderItems: Relation<OrderItem[]>;

  @OneToMany(() => Shipping, (shipping) => shipping.order, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  shippings: Relation<Shipping[]>;

  @OneToMany(() => Return, (returnEntity) => returnEntity.order, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  returns: Return[];

  @OneToMany(() => Payment, (paymentEntity) => paymentEntity.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  payment: Relation<Payment[]>;

  @OneToMany(() => Transaction, (transaction) => transaction.order, {
    nullable: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  transactions: Transaction[];
}
