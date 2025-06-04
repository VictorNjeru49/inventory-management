import { Transaction } from '../../transactions/entities/transaction.entity';
import {
  Column,
  Entity,
  JoinColumn,
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
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  transactionId: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CreditCard,
  })
  paymentMethod: PaymentMethod;

  @ManyToOne(() => Transaction, (transaction) => transaction.payments)
  @JoinColumn({ name: 'transactionId' })
  transaction: Relation<Transaction>;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  paymentDate: Date;

  @Column({ nullable: true })
  inventoryId: number;

  @Column({ nullable: true })
  orderId: number;

  @Column({ nullable: true })
  userId: number;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.Pending })
  status: PaymentStatus;
}
