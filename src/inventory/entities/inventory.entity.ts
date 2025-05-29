import { Product } from '../../products/entities/product.entity';
import { Warehouse } from '../../warehouses/entities/warehouse.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  productId: number;
  @Column()
  warehouseId: number;
  @Column()
  stockQty: number;
  @Column()
  createdAt: Date;
  @ManyToOne(() => Product, (product) => product)
  product: Product;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse)
  warehouse: Warehouse;
}
