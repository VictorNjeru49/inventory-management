import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity'; // Assuming you have a Payment entity defined
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepo.create(createPaymentDto);
    return this.paymentRepo.save(payment);
  }

  async findAll(search?: number): Promise<Payment[]> {
    if (search) {
      return this.paymentRepo.find({
        where: {
          amount: search,
          transactionId: search,
        },
        relations: ['transaction', 'order', 'user', 'inventory'],
      });
    }
    return this.paymentRepo.find({
      relations: ['transaction', 'order', 'user', 'inventory'],
    });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepo.findOneBy({ id });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    await this.paymentRepo.update(id, updatePaymentDto);
    const updatedPayment = await this.paymentRepo.findOneBy({ id });
    if (!updatedPayment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return updatedPayment;
  }

  async remove(id: number): Promise<void> {
    const result = await this.paymentRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
  }
}
