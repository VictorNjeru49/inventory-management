import { Injectable } from '@nestjs/common';
import { CreateRegisterDto, UpdateRegisterDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Register } from './entities/register.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Register)
    private readonly registerRepository: Repository<Register>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createRegisterDto: CreateRegisterDto) {
    try {
      const newUser = this.userRepository.create({
        firstName: createRegisterDto.firstName,
        lastName: createRegisterDto.lastName,
        email: createRegisterDto.email,
        password: createRegisterDto.password,
        role: createRegisterDto.role,
      });

      const savedUser = await this.userRepository.save(newUser);
      console.log('User created:', savedUser);

      const newRegister = this.registerRepository.create({
        email: savedUser.email,
        role: createRegisterDto.role,
        user: savedUser,
      });

      // Save the register entry
      return await this.registerRepository.save(newRegister);
    } catch (error) {
      console.error('Error during registration process:', error);
      throw new Error('Registration failed. Please try again later.');
    }
  }

  findAll(search?: string) {
    if (search) {
      console.log(`This action returns all users matching the search term`);
      return this.registerRepository.find({
        where: [{ email: search }],
      });
    }
    return this.registerRepository.find({
      where: [{ email: search }],
      relations: ['user'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} register`;
  }

  async update(
    id: number,
    updateRegisterDto: UpdateRegisterDto,
  ): Promise<Register | null> {
    const updateResult = await this.registerRepository.update(
      id,
      updateRegisterDto,
    );
    if (updateResult.affected === 0) {
      throw new Error(`Register with ID ${id} not found`);
    }

    return this.registerRepository.findOne({ where: { id } }); // Return the updated entity
  }

  async remove(id: number): Promise<void> {
    await this.registerRepository.delete(id);
  }
}
