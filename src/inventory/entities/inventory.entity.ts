import { Product } from '../../products/entities/product.entity';
import { Warehouse } from '../../warehouses/entities/warehouse.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  stockQty: number;

  @Column()
  productId: number;

  @Column()
  warehouseId: number;

  @ManyToOne(() => Product, (product) => product.inventory)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.inventory)
  @JoinColumn({ name: 'warehouseId' })
  warehouse: Warehouse;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
