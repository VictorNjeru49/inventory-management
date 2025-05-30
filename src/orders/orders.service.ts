import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity'; // Assuming you have an Order entity defined
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepo.create(createOrderDto);
    return this.orderRepo.save(order);
  }

  async findAll(search?: number): Promise<Order[]> {
    if (search) {
      return this.orderRepo.find({
        where: [{ totalPrice: search, userId: search }],
        relations: [
          'user',
          'orderItems',
          'shippings',
          'returns',
          'transactions',
        ],
      });
    }
    return this.orderRepo.find({
      relations: ['user', 'orderItems', 'shippings', 'returns', 'transactions'],
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepo.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.orderRepo.update(id, updateOrderDto);
    const updatedOrder = await this.orderRepo.findOneBy({ id });
    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return updatedOrder;
  }

  async remove(id: number): Promise<void> {
    const result = await this.orderRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }
}
