import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Discount {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @ApiProperty()
  @Column()
  noDiscount: number;
  @ApiProperty()
  @Column()
  partial: number;
  @ApiProperty()
  @Column()
  promotional: number;
  @ApiProperty()
  @Column()
  loyalty: number;
}
