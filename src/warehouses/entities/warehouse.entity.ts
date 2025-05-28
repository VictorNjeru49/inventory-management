import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Warehouse {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  location: string;
  @Column()
  contactEmail: string;
  @Column({ default: true })
  isActive: boolean;
  @Column({ nullable: true })
  description?: string;
}
