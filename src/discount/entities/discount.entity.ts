import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Discount {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  noDiscount: number;
  @Column()
  partial: number;
  @Column()
  promotional: number;
  @Column()
  loyalty: number;
}
