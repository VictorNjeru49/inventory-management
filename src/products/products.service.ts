import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const user = this.productsRepo.create(createProductDto);
    return this.productsRepo.save(user);
  }

  async findAll(search?: string): Promise<Product[]> {
    if (search) {
      return this.productsRepo.find({
        where: [{ name: search }, { description: search }],
        relations: [
          'category',
          'supplier',
          'orderItems',
          'warehouse',
          'inventory',
          'returns',
        ],
      });
    }
    return this.productsRepo.find({
      relations: [
        'category',
        'supplier',
        'orderItems',
        'warehouse',
        'inventory',
        'returns',
      ],
    });
  }

  async findOne(id: number): Promise<Product | null> {
    return this.productsRepo.findOneBy({ id });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    if (updateProductDto.name) {
      throw new Error(
        `This action updates a #${id} product with new name: ${updateProductDto.name}`,
      );
    }
    await this.productsRepo.update(id, updateProductDto);
    return this.productsRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.productsRepo.delete(id);
  }
}
