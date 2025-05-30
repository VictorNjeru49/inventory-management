import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity'; // Assuming you have an OrderItem entity defined
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepo: Repository<OrderItem>,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const orderItem = this.orderItemRepo.create(createOrderItemDto);
    return this.orderItemRepo.save(orderItem);
  }

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemRepo.find({
      relations: ['order', 'product'],
    });
  }

  async findOne(id: number): Promise<OrderItem> {
    const orderItem = await this.orderItemRepo.findOneBy({ id });
    if (!orderItem) {
      throw new NotFoundException(`Order item with ID ${id} not found`);
    }
    return orderItem;
  }

  async update(
    id: number,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    await this.orderItemRepo.update(id, updateOrderItemDto);
    const updatedOrderItem = await this.orderItemRepo.findOneBy({ id });
    if (!updatedOrderItem) {
      throw new NotFoundException(`Order item with ID ${id} not found`);
    }
    return updatedOrderItem;
  }

  async remove(id: number): Promise<void> {
    const result = await this.orderItemRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order item with ID ${id} not found`);
    }
  }
}
