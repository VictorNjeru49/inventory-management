import { Product } from '../../products/entities/product.entity';
import { Order } from '../../orders/entities/order.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  userId: number;
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
  @ManyToOne(() => User, (user) => user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Order, (order) => order, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  order: Order;

  @ManyToOne(() => Product, (product) => product, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  product: Product;
}
