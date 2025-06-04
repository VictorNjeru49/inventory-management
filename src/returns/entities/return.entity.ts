import { Product } from '../../products/entities/product.entity';
import { Order } from '../../orders/entities/order.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

export enum ReturnStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity()
export class Return {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  quantity: number;

  @Column({ nullable: false })
  orderId: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  productId: number;

  @Column()
  returnReason: string;

  @Column({ type: 'enum', enum: ReturnStatus, default: ReturnStatus.PENDING })
  returnStatus: ReturnStatus;

  @ManyToOne(() => Order, (order) => order.returns)
  @JoinColumn({ name: 'orderId' })
  order: Relation<Order>;

  @ManyToOne(() => User, (user) => user.returns)
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @ManyToOne(() => Product, (product) => product.returns)
  @JoinColumn({ name: 'productId' })
  product: Relation<Product>;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
