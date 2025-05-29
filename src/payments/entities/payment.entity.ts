import { Transaction } from '../../transactions/entities/transaction.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

export enum PaymentStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed',
}

export enum PaymentMethod {
  CreditCard = 'Credit Card',
  PayPal = 'PayPal',
  BankTransfer = 'Bank Transfer',
  Cash = 'Cash',
  Cryptocurrency = 'Cryptocurrency',
  Other = 'Other',
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CreditCard,
  })
  paymentMethod: PaymentMethod; // e.g., 'Credit Card', 'PayPal', etc.

  @Column()
  transactionId: number; // Unique identifier for the transaction

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  paymentDate: Date;

  @Column({ nullable: true })
  inventoryId: number; // Foreign key to the inventory item (if applicable)

  @Column({ nullable: true })
  orderId: number; // Foreign key to the inventory item (if applicable)

  @Column({ nullable: true })
  userId: number; // Foreign key to the user making the payment (if applicable)

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.Pending })
  status: PaymentStatus; // e.g., 'Pending', 'Completed', 'Failed'

  @ManyToOne(() => Transaction, (transaction) => transaction, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  transaction: Relation<Transaction>;
}
