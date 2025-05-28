import { Injectable } from '@nestjs/common';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';

@Injectable()
export class TransactionsService {
  create(createTransactionDto: CreateTransactionDto) {
    return `This action adds a new transaction with product ID ${createTransactionDto.productId} and quantity ${createTransactionDto.quantity}`;
  }

  findAll(search?: string) {
    if (search) {
      return `This action returns all transactions matching the search term: ${search}`;
    }
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    if (updateTransactionDto.quantity) {
      return `This action updates a #${id} transaction with new quantity ${updateTransactionDto.quantity}`;
    }
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
