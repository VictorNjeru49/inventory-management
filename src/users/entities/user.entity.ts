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

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole; // e.g., 'admin', 'user', etc.
  @Column({ default: true })
  isActive: boolean;
  @Column({ default: new Date() })
  createdAt: Date;
  @Column({ default: new Date() })
  updatedAt: Date;
  @OneToMany(() => Order, (order) => order.userId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  orders: Relation<Order[]>;

  @OneToMany(() => Return, (returnRecord) => returnRecord.userId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  returns: Relation<Return[]>;

  @OneToMany(() => Transaction, (transaction) => transaction.userId, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  transaction: Relation<Transaction[]>;
}
