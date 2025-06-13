import { Injectable } from '@nestjs/common';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipping } from './entities/shipping.entity';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(Shipping)
    private shippingRepo: Repository<Shipping>,
  ) {}
  async create(createShippingDto: CreateShippingDto): Promise<Shipping> {
    const shipping = this.shippingRepo.create(createShippingDto);
    return this.shippingRepo.save(shipping);
  }

  async findAll(search?: string): Promise<Shipping[]> {
    if (search) {
      return this.shippingRepo.find({
        where: [{ trackingNumber: search }],
        relations: ['order'],
      });
    }
    return this.shippingRepo.find({
      relations: ['order'],
    });
  }

  async findOne(id: number): Promise<Shipping | null> {
    return this.shippingRepo.findOneBy({ id });
  }

  async update(
    id: number,
    updateShippingDto: UpdateShippingDto,
  ): Promise<Shipping | null> {
    if (updateShippingDto.trackingNumber) {
      throw new Error(
        `This action updates a #${id} shipping with new tracking number: ${updateShippingDto.trackingNumber}`,
      );
    }
    await this.shippingRepo.update(id, updateShippingDto);
    return this.shippingRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.shippingRepo.delete(id);
  }
}
