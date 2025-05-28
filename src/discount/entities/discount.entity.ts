import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Discount {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  noDiscount;
  @Column()
  partial;
  @Column()
  promotional;
  @Column()
  loyalty;
}
