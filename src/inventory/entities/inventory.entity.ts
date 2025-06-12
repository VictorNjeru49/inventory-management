import { Payment } from 'src/payments/entities/payment.entity';
import { Product } from '../../products/entities/product.entity';
import { Warehouse } from '../../warehouses/entities/warehouse.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stockQty: number;

  @Column({ nullable: false })
  productId: number;

  @Column({ nullable: false })
  warehouseId: number;

  @ManyToOne(() => Product, (product) => product.inventory)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.inventory)
  @JoinColumn({ name: 'warehouseId' })
  warehouse: Warehouse;

  @OneToMany(() => Payment, (paymentEntity) => paymentEntity.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  payment: Relation<Payment[]>;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
