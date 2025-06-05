import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as Bcrypt from 'bcrypt';

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

  // Helper method to remove password from profile
  private excludePassword(user: User): Partial<User> {
    const { password, hashedRefreshToken, ...rest } = user;
    return rest;
  }

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const existingUser = await this.userRepo.findOne({
      where: { email: createUserDto.email },
      select: ['id'], // Only select the id to avoid loading the entire profile
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

    return this.excludePassword(savedProfile);
  }

  async findAll(): Promise<User[]> {
    // if (search) {
    //   console.log(
    //     `This action returns all users matching the search term: ${search}`,
    //   );
    //   return this.userRepo.find({
    //     where: [{ firstName: search }, { lastName: search }, { email: search }],
    //     relations: ['orders', 'returns', 'transactions', 'registers'],
    //   });
    // }

    console.log(`This action returns all users`);
    return this.userRepo.find({
      relations: ['orders', 'returns', 'transactions', 'registers'],
    });
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepo.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    await this.userRepo.update(id, updateUserDto);
    return this.userRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }
}
