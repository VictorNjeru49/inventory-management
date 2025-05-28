import { Injectable } from '@nestjs/common';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { UpdatePricingDto } from './dto/update-pricing.dto';

@Injectable()
export class PricingService {
  create(createPricingDto: CreatePricingDto) {
    return `This action adds a new pricing with name: ${createPricingDto.discountId}`;
  }

  findAll(search?: string) {
    if (search) {
      return `This action returns all pricing matching the search term: ${search}`;
    }
    return `This action returns all pricing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pricing`;
  }

  update(id: number, updatePricingDto: UpdatePricingDto) {
    if (updatePricingDto.discountId) {
      return `This action updates a #${id} pricing with new discountId: ${updatePricingDto.discountId}`;
    }
    return `This action updates a #${id} pricing`;
  }

  remove(id: number) {
    return `This action removes a #${id} pricing`;
  }
}
