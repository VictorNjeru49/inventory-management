import { OrderItem } from '../../order-items/entities/order-item.entity';
import { Shipping } from '../../shipping/entities/shipping.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { User } from '../../users/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  Relation,
} from 'typeorm';

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
  @ManyToOne(() => User, (user) => user)
  user: Relation<User>;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.orderId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  orderItems: Relation<OrderItem[]>;

  @OneToOne(() => Shipping, (shippingRecord) => shippingRecord.orderId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  shippingRecord: Relation<Shipping>;

  @OneToOne(() => Transaction, (transaction) => transaction.orderId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  transaction: Relation<Transaction>;
}
