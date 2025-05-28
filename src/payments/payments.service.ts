import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  create(createPaymentDto: CreatePaymentDto) {
    return `This action adds a new payment with amount: ${createPaymentDto.amount}`;
  }

  findAll(search?: string) {
    if (search) {
      return `This action returns all payments matching the search term: ${search}`;
    }
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    if (updatePaymentDto.amount) {
      return `This action updates a #${id} payment with new amount: ${updatePaymentDto.amount}`;
    }
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
