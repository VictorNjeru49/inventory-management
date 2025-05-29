import { Product } from '../../products/entities/product.entity';
import { Column, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';

export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  createdAt: Date;
  @OneToMany(() => Product, (product) => product.categoryId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  products: Relation<Product[]>;
}
