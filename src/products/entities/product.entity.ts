import { Inventory } from '../../inventory/entities/inventory.entity';
import { Category } from '../../categories/entities/category.entity';
import { OrderItem } from '../../order-items/entities/order-item.entity';
import { Supplier } from '../../suppliers/entities/supplier.entity';
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
import { Return } from '../../returns/entities/return.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  sku: string;

  @Column()
  price: number;

  @Column({ nullable: false })
  categoryId: number;

  @Column({ nullable: false })
  supplierId: number;

  @Column({ nullable: false })
  warehouseId: number;

  @Column()
  stockQuantity: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Relation<Category>;

  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  @JoinColumn({ name: 'supplierId' })
  supplier: Relation<Supplier>;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: Relation<OrderItem[]>;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.products)
  @JoinColumn({ name: 'warehouseId' })
  warehouse: Relation<Warehouse>;

  // New relationship to Inventory
  @OneToMany(() => Inventory, (inventory) => inventory.product)
  inventory: Inventory[];

  // New relationship to Returns
  @OneToMany(() => Return, (returnEntity) => returnEntity.product)
  returns: Return[];

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
