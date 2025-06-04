import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class Register {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column()
  email: string;
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ManyToOne(() => User, (user) => user.registers, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;
}
