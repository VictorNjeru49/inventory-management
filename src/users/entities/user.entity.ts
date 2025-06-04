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

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
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
  role: UserRole;

  @Column({ type: 'text', nullable: true, default: null })
  hashedPassword: string | null;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.user, {
    cascade: true,
    nullable: true,
  })
  orders: Relation<Order[]>;

  @OneToMany(() => Return, (returnEntity) => returnEntity.user, {
    cascade: true,
    nullable: true,
  })
  returns: Relation<Return[]>;

  @OneToMany(() => Transaction, (transaction) => transaction.user, {
    cascade: true,
    nullable: true,
  })
  transactions: Relation<Transaction[]>;
  @OneToMany(() => Register, (register) => register.user)
  registers: Register[];
}
