import { Inventory } from '../../inventory/entities/inventory.entity';
import { Product } from '../../products/entities/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
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

  @OneToMany(() => Inventory, (inventory) => inventory.warehouse)
  inventory: Relation<Inventory[]>;

  @OneToMany(() => Product, (product) => product.warehouse)
  products: Relation<Product[]>;
}
