import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as Bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  private async hashData(data: string): Promise<string> {
    const salt = await Bcrypt.genSalt(10);
    return await Bcrypt.hash(data, salt);
  }

  // private excludePassword(user: User): Partial<User> {
  //   const { password, hashedRefreshToken, ...rest } = user;
  //   return rest;
  // }
  // private excludeSensitiveFields(
  //   user: User,
  // ): Omit<User, 'password' | 'hashedRefreshToken' | 'role'> {
  //   const { password, hashedRefreshToken, role, ...safeUser } = user;
  //   return safeUser;
  // }

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const existingUser = await this.userRepo.findOne({
      where: { email: createUserDto.email },
      select: ['id'],
    });
    if (existingUser) {
      throw new Error(
        `Profile with email ${createUserDto.email} already exists`,
      );
    }
    const hashedPassword = await this.hashData(createUserDto.password);
    const user = this.userRepo.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedProfile = await this.userRepo.save(user);

    return savedProfile;
  }

  async findAll(search?: string): Promise<User[]> {
    let users: User[];
    if (search) {
      console.log(
        `This action returns all users matching the search term: ${search}`,
      );
      users = await this.userRepo.find({
        where: [{ firstName: search }, { lastName: search }, { email: search }],
        relations: ['orders', 'returns', 'payment', 'transactions'],
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      });
    } else {
      console.log(`This action returns all users`);
      users = await this.userRepo.find({
        relations: ['orders', 'returns', 'payment', 'transactions'],
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      });
    }

    return users;
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['orders', 'returns', 'payment', 'transactions'],
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    return user || null;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    await this.userRepo.update(id, updateUserDto);
    return this.userRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }
}
