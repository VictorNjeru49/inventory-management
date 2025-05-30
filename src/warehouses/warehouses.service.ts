import { Injectable } from '@nestjs/common';
import { CreateWarehouseDto, UpdateWarehouseDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WarehousesService {
  constructor(
    @InjectRepository(Warehouse)
    private warehouse: Repository<Warehouse>,
  ) {}

  async create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
    const warehouse = this.warehouse.create(createWarehouseDto);
    return this.warehouse.save(warehouse);
  }

  async findAll(search?: string): Promise<Warehouse[]> {
    if (search) {
      return this.warehouse.find({
        where: [
          { name: search },
          { location: search },
          { description: search },
        ],
        relations: ['inventory', 'products'],
      });
    }
    return this.warehouse.find({
      relations: ['inventory', 'products'],
    });
  }

  async findOne(id: number): Promise<Warehouse | null> {
    return this.warehouse.findOneBy({ id });
  }

  async update(
    id: number,
    updateWarehouseDto: UpdateWarehouseDto,
  ): Promise<Warehouse | null> {
    if (updateWarehouseDto.id !== id) {
      throw new Error(
        `ID mismatch: provided ID ${updateWarehouseDto.id} does not match the requested ID ${id}`,
      );
    }
    await this.warehouse.update(id, updateWarehouseDto);
    return this.warehouse.findOneBy({ id });
  }

  async remove(id: number) {
    await this.warehouse.delete(id);
  }
}
