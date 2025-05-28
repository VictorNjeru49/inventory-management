import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  productId: number;
  @Column()
  warehouseId: number;
  @Column()
  stockQty: number;
  @Column()
  createdAt: Date;
}
