import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';
import {
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  Entity,
  Relation,
  JoinColumn,
} from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  orderId: number;
  @Column({ nullable: false })
  productId: number;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' })
  order: Relation<Order>;

  @ManyToOne(() => Product, (product) => product.orderItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Relation<Product>;
}
