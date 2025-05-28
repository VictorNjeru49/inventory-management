import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  categoryId: number; // Number of items available in stock

  @Column()
  supplierId: number; // Foreign key to Supplier

  @Column()
  stockQuantity: number; // Number of items available in stock

  @Column()
  createdAt: Date; // Timestamp when the product was created, defaults to current timestamp

  @Column()
  updatedAt: Date; // Timestamp when the product was last updated, defaults to current timestamp
}
