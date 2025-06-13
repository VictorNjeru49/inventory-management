import { Return } from '../../returns/entities/return.entity';
import { Order } from '../../orders/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Relation,
} from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Register } from '../../register/entities/register.entity';
import { UserRole } from '../common/role.enum';
import { Payment } from 'src/payments/entities/payment.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true, nullable: true })
  email: string;


  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'text', nullable: true, default: null, select: false })
  hashedRefreshToken: string | null;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  orders: Relation<Order[]>;

  @OneToMany(() => Return, (returnEntity) => returnEntity.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  returns: Relation<Return[]>;

  @OneToMany(() => Payment, (paymentEntity) => paymentEntity.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  payment: Relation<Payment[]>;

  @OneToMany(() => Transaction, (transaction) => transaction.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  transactions: Relation<Transaction[]>;

  @OneToMany(() => Register, (register) => register.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  registers: Register[];
}
