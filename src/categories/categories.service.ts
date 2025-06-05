import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepo.create(createCategoryDto);
    return this.categoryRepo.save(category);
  }

  async findAll(): Promise<Category[]> {
    // if (search) {
    //   return this.categoryRepo.find({
    //     where: { name: search },
    //     relations: ['products'],
    //   });
    // }
    return this.categoryRepo.find({
      relations: ['products'],
    });
  }

  async findOne(id: number): Promise<Category | null> {
    return this.categoryRepo.findOneBy({ id });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | null> {
    await this.categoryRepo.update(id, updateCategoryDto);
    return this.categoryRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepo.delete(id);
  }
}
