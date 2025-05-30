import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePricingDto } from './dto/create-pricing.dto';
import { UpdatePricingDto } from './dto/update-pricing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pricing } from './entities/pricing.entity'; // Assuming you have a Pricing entity defined
import { Repository } from 'typeorm';

@Injectable()
export class PricingService {
  constructor(
    @InjectRepository(Pricing)
    private pricingRepo: Repository<Pricing>,
  ) {}

  async create(createPricingDto: CreatePricingDto): Promise<Pricing> {
    const pricing = this.pricingRepo.create(createPricingDto);
    return this.pricingRepo.save(pricing);
  }

  async findAll(search?: string): Promise<Pricing[]> {
    if (search) {
      return this.pricingRepo.find({
        where: {
          promotion: search,
        },
      });
    }
    return this.pricingRepo.find();
  }

  async findOne(id: number): Promise<Pricing> {
    const pricing = await this.pricingRepo.findOneBy({ id });
    if (!pricing) {
      throw new NotFoundException(`Pricing with ID ${id} not found`);
    }
    return pricing;
  }

  async update(
    id: number,
    updatePricingDto: UpdatePricingDto,
  ): Promise<Pricing> {
    await this.pricingRepo.update(id, updatePricingDto);
    const updatedPricing = await this.pricingRepo.findOneBy({ id });
    if (!updatedPricing) {
      throw new NotFoundException(`Pricing with ID ${id} not found`);
    }
    return updatedPricing;
  }

  async remove(id: number): Promise<void> {
    const result = await this.pricingRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pricing with ID ${id} not found`);
    }
  }
}
