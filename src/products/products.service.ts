import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    return `This action adds a new product with name: ${createProductDto.name}`;
  }

  findAll(search?: string) {
    if (search) {
      return `This action returns all products matching the search term: ${search}`;
    }
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    if (updateProductDto.name) {
      return `This action updates a #${id} product with new name: ${updateProductDto.name}`;
    }
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
