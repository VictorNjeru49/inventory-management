import { Injectable } from '@nestjs/common';
import { CreateSupplierDto, UpdateSupplierDto } from './dto';
import { Supplier } from './entities/supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepo: Repository<Supplier>,
  ) {}
  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const supplier = this.supplierRepo.create(createSupplierDto);
    return this.supplierRepo.save(supplier);
  }

  async findAll(): Promise<Supplier[]> {
    // if (search) {
    //   return this.supplierRepo.find({
    //     where: [{ name: search }, { contactInfo: search }, { address: search }],
    //     relations: ['products'],
    //   });
    // }
    return this.supplierRepo.find({
      relations: ['products'],
    });
  }

  async findOne(id: number): Promise<Supplier | null> {
    return this.supplierRepo.findOneBy({ id });
  }

  async update(
    id: number,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<Supplier | null> {
    if (updateSupplierDto.name || updateSupplierDto.contactInfo) {
      throw new Error(
        `This action updates supplier #${id} with name ${updateSupplierDto.name} and contact ${updateSupplierDto.contactInfo}`,
      );
    }
    await this.supplierRepo.update(id, updateSupplierDto);
    return this.supplierRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.supplierRepo.delete(id);
  }
}
