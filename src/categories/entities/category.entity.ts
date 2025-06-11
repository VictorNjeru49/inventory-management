import { Product } from '../../products/entities/product.entity';
import {
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  Entity,
  Relation,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Product, (product) => product.category)
  products: Relation<Product[]>;
}
