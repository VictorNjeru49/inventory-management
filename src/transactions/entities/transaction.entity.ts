import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum TransactionType {
  SALE = 'sale',
  PURCHASE = 'purchase',
  RETURN = 'return',
  ADJUSTMENT = 'adjustment',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  productId: number; // Foreign key to User entity
  @Column()
  quanity: number;
  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.SALE,
  })
  transacrion_type: TransactionType; // e.g., 'credit', 'debit'
  @Column({ default: new Date() })
  createdAt: Date;
}
