import { Injectable } from '@nestjs/common';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';

@Injectable()
export class ShippingService {
  create(createShippingDto: CreateShippingDto) {
    return `This action adds a new shipping with tracking number: ${createShippingDto.trackingNumber}`;
  }

  findAll(search?: string) {
    if (search) {
      return `This action returns all shipping matching the search term: ${search}`;
    }
    return `This action returns all shipping`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shipping`;
  }

  update(id: number, updateShippingDto: UpdateShippingDto) {
    if (updateShippingDto.trackingNumber) {
      return `This action updates a #${id} shipping with new tracking number: ${updateShippingDto.trackingNumber}`;
    }
    return `This action updates a #${id} shipping`;
  }

  remove(id: number) {
    return `This action removes a #${id} shipping`;
  }
}
