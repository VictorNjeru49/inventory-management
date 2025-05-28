import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  contactInfo: string;
  @Column()
  address: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
