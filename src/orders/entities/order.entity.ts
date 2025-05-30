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

  @Column()
  userId: number;

  @Column()
  totalPrice: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
  status: OrderStatus;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' }) // Specify the foreign key column
  user: Relation<User>;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
    nullable: true,
  })
  orderItems: Relation<OrderItem[]>;

  @OneToMany(() => Shipping, (shipping) => shipping.order, {
    cascade: true,
    nullable: true,
  })
  shippings: Relation<Shipping[]>;
  // New relationship to Returns
  @OneToMany(() => Return, (returnEntity) => returnEntity.order, {
    nullable: true,
    cascade: true,
  })
  returns: Return[];

  // New relationship to Transactions
  @OneToMany(() => Transaction, (transaction) => transaction.order, {
    nullable: true,
    cascade: true,
  })
  transactions: Transaction[];
}
