import { Injectable } from '@nestjs/common';
import { CreateInventoryDto, UpdateInventoryDto } from './dto';

@Injectable()
export class InventoryService {
  create(createInventoryDto: CreateInventoryDto) {
    // Example: return the received DTO for now to use the parameter
    return createInventoryDto;
  }

  findAll(search?: string) {
    if (search) {
      return `${search}`;
    }
    return `This action returns all inventory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventory`;
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    // Example: return the id and the update DTO to use both parameters
    return { id, updatedData: updateInventoryDto };
  }

  remove(id: number) {
    return `This action removes a #${id} inventory`;
  }
}
