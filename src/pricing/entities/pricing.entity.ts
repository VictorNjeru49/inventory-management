import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pricing {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
  @Column()
  discountId: number;
  @Column()
  promotion: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  endDate: Date;
}
