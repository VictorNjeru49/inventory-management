import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
