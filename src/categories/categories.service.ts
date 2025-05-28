import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  create(createCategoryDto: CreateCategoryDto) {
    //  'This action adds a new category';
    return createCategoryDto;
  }

  findAll(search?: string) {
    if (search) {
      return `${search}`;
    }
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category with data: ${JSON.stringify(updateCategoryDto)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
