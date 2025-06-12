import { UserRole } from 'src/users/common/role.enum';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Register {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column()
  email: string;
  @Column()
  password: string;
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
    nullable: false,
  })
  role: UserRole;

  @ManyToOne(() => User, (user) => user.registers, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;
}
