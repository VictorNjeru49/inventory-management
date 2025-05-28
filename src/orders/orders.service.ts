import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  create(createOrderDto: CreateOrderDto) {
    return `This action adds a new order with details: ${JSON.stringify(createOrderDto)}`;
  }

  findAll(search?: string) {
    if (search) {
      return `This action returns all orders matching the search term: ${search}`;
    }
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    if (updateOrderDto) {
      return `This action updates a #${id} order with details: ${JSON.stringify(updateOrderDto)}`;
    }
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
