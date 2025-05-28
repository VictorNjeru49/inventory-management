import { Injectable } from '@nestjs/common';
import { CreateWarehouseDto, UpdateWarehouseDto } from './dto';

@Injectable()
export class WarehousesService {
  create(createWarehouseDto: CreateWarehouseDto) {
    return `This action adds a new warehouse with name: ${createWarehouseDto.name}, location: ${createWarehouseDto.location}, 
    contactEmail: ${createWarehouseDto.contactEmail}, isActive: ${createWarehouseDto.isActive}, description: ${createWarehouseDto.description}`;
  }

  findAll(search?: string) {
    if (search) {
      return `This action returns all warehouses matching the search term: ${search}`;
    }
    return `This action returns all warehouses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} warehouse`;
  }

  update(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    if (updateWarehouseDto.id !== id) {
      throw new Error(
        `ID mismatch: provided ID ${updateWarehouseDto.id} does not match the requested ID ${id}`,
      );
    }
    return `This action updates a #${id} warehouse`;
  }

  remove(id: number) {
    return `This action removes a #${id} warehouse`;
  }
}
