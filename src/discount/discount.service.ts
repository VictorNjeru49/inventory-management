import { Injectable } from '@nestjs/common';
import { CreateDiscountDto, UpdateDiscountDto } from './dto';

@Injectable()
export class DiscountService {
  create(createDiscountDto: CreateDiscountDto) {
    return createDiscountDto;
    //  'This action adds a new discount';
  }

  findAll(search?: string) {
    if (search) {
      return `the Output: ${search} `;
    }
    return `This action returns all discount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discount`;
  }

  update(id: number, updateDiscountDto: UpdateDiscountDto) {
    return `This action updates a #${id} discount ${JSON.stringify(updateDiscountDto)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} discount`;
  }
}
