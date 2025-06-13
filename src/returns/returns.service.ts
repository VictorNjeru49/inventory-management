import { Injectable } from '@nestjs/common';
import { CreateReturnDto, UpdateReturnDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Return } from './entities/return.entity';

@Injectable()
export class ReturnsService {
  constructor(
    @InjectRepository(Return)
    private returnRepo: Repository<Return>,
  ) {}
  async create(createReturnDto: CreateReturnDto): Promise<Return> {
    const returnee = this.returnRepo.create(createReturnDto);
    return this.returnRepo.save(returnee);
  }

  async findAll(search?: number): Promise<Return[]> {
    if (search) {
      return this.returnRepo.find({
        where: [
          { quantity: search },
          { productId: search },
          { userId: search },
        ],
        relations: ['order', 'user', 'product'],
        select: {
          id: true,
          quantity: true,
          returnReason: true,
          returnStatus: true,
        },
      });
    }
    return this.returnRepo.find({
      relations: ['order', 'user', 'product'],
      select: {
        id: true,
        quantity: true,
        returnReason: true,
        returnStatus: true,
      },
    });
  }

  async findOne(id: number): Promise<Return | null> {
    const returnItem = await this.returnRepo.findOne({
      where: { id },
      relations: ['order', 'user', 'product'],
      select: {
        id: true,
        quantity: true,
        returnReason: true,
        returnStatus: true,
      },
    });
    return returnItem || null;
  }

  async update(
    id: number,
    updateReturnDto: UpdateReturnDto,
  ): Promise<Return | null> {
    if (updateReturnDto.id !== id) {
      throw new Error(
        `ID mismatch: provided ${updateReturnDto.id}, expected ${id}`,
      );
    }
    await this.returnRepo.update(id, updateReturnDto);
    return this.returnRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.returnRepo.delete(id);
  }
}
