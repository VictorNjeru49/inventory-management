import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  orderId: number;
  @Column()
  quantity: number;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number; // Total price for this order item (quantity * price)

  @ManyToOne(() => Order, (order) => order, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  order: Relation<Order>;

  @ManyToOne(() => Product, (product) => product.orderItemsId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  product: Relation<Product>;
}
