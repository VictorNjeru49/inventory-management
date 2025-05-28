import { Injectable } from '@nestjs/common';
import { CreateReturnDto, UpdateReturnDto } from './dto';

@Injectable()
export class ReturnsService {
  create(createReturnDto: CreateReturnDto) {
    return `This action adds a new return with details: ${JSON.stringify(createReturnDto)}`;
  }

  findAll(search?: string) {
    if (search) {
      return `This action returns all returns matching the search term: ${search}`;
    }
    return `This action returns all returns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} return`;
  }

  update(id: number, updateReturnDto: UpdateReturnDto) {
    if (updateReturnDto.id !== id) {
      throw new Error(
        `ID mismatch: provided ${updateReturnDto.id}, expected ${id}`,
      );
    }
    return `This action updates a #${id} return`;
  }

  remove(id: number) {
    return `This action removes a #${id} return`;
  }
}
