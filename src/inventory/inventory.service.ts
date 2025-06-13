import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto, UpdateInventoryDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity'; // Assuming you have an Inventory entity defined

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepo: Repository<Inventory>,
  ) {}

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    const inventoryItem = this.inventoryRepo.create(createInventoryDto);
    return this.inventoryRepo.save(inventoryItem);
  }

  async findAll(search?: number): Promise<Inventory[]> {
    if (search) {
      return this.inventoryRepo.find({
        where: [{ stockQty: search }],
        relations: ['product', 'warehouse', 'payment'],
      });
    }
    return this.inventoryRepo.find({
      relations: ['product', 'warehouse', 'payment'],
    });
  }

  async findOne(id: number): Promise<Inventory> {
    const inventoryItem = await this.inventoryRepo.findOneBy({ id });
    if (!inventoryItem) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }
    return inventoryItem;
  }

  async update(
    id: number,
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<Inventory> {
    await this.inventoryRepo.update(id, updateInventoryDto);
    const updatedInventoryItem = await this.inventoryRepo.findOneBy({ id });
    if (!updatedInventoryItem) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }
    return updatedInventoryItem;
  }

  async remove(id: number): Promise<void> {
    const result = await this.inventoryRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }
  }
}
