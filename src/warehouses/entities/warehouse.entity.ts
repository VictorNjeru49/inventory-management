import { Inventory } from '../../inventory/entities/inventory.entity';
import { Product } from '../../products/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  Relation,
} from 'typeorm';

@Entity()
export class Warehouse {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  location: string;
  @Column()
  contactEmail: string;
  @Column({ default: true })
  isActive: boolean;
  @Column({ nullable: true })
  description?: string;
  @ManyToMany(() => Product, (product) => product.warehouseId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  products: Relation<Product[]>;

  @OneToMany(() => Inventory, (inventory) => inventory.warehouseId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  inventories: Relation<Inventory[]>;
}
