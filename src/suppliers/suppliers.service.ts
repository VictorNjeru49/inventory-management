import { Injectable } from '@nestjs/common';
import { CreateSupplierDto, UpdateSupplierDto } from './dto';

@Injectable()
export class SuppliersService {
  create(createSupplierDto: CreateSupplierDto) {
    return `This action adds a new supplier with name 
    ${createSupplierDto.name} and contact ${createSupplierDto.contactInfo}`;
  }

  findAll(search?: string) {
    if (search) {
      return `This action returns all suppliers matching the search term: ${search}`;
    }
    return `This action returns all suppliers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplier`;
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    if (updateSupplierDto.name || updateSupplierDto.contactInfo) {
      return `This action updates supplier #${id} with name ${updateSupplierDto.name} and contact ${updateSupplierDto.contactInfo}`;
    }
    return `This action updates a #${id} supplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
