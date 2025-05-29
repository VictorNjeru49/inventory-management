import { Category } from '../../categories/entities/category.entity';
import { OrderItem } from '../../order-items/entities/order-item.entity';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import { Warehouse } from '../../warehouses/entities/warehouse.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  sku: string; // Stock Keeping Unit, a unique identifier for the product

  @Column()
  price: number;
  @Column()
  orderItemsId: number;

  @Column()
  warehouseId: number;
  @Column()
  categoryId: number; // Number of items available in stock

  @Column()
  supplierId: number; // Foreign key to Supplier

  @Column()
  stockQuantity: number; // Number of items available in stock

  @Column()
  createdAt: Date; // Timestamp when the product was created, defaults to current timestamp

  @Column()
  updatedAt: Date; // Timestamp when the product was last updated, defaults to current timestamp
  @ManyToMany(() => OrderItem, (orderItem) => orderItem, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  orderItems: Relation<OrderItem[]>;

  @ManyToOne(() => Category, (category) => category, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  category: Relation<Category>;

  @ManyToOne(() => Supplier, (supplier) => supplier, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  supplier: Relation<Supplier>;

  @ManyToMany(() => Warehouse, (warehouse) => warehouse, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  warehouses: Relation<Warehouse[]>;
}
