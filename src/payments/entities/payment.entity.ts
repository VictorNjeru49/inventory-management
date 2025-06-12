import { User } from 'src/users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';

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

  @Column({ nullable: true })
  transactionId: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CreditCard,
  })
  paymentMethod: PaymentMethod;

  @ManyToOne(() => Transaction, (transaction) => transaction.payments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'transactionId' })
  transaction: Relation<Transaction>;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  paymentDate: Date;

  @Column({ nullable: true })
  inventoryId: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.payment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'inventoryId' })
  inventory: Relation<Inventory>;

  @Column({ nullable: true })
  orderId: number;

  @ManyToOne(() => Order, (order) => order.payment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' })
  order: Relation<Order>;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.payment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.Pending })
  status: PaymentStatus;
}
