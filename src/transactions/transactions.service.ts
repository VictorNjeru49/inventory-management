import { Injectable } from '@nestjs/common';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const transaction = this.transactionRepo.create(createTransactionDto);
    return this.transactionRepo.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    // if (search) {
    //   return this.transactionRepo.find({
    //     where: [{ quantity: search }, { userId: search }, { orderId: search }],
    //     relations: ['orders', 'user', 'payments'],
    //   });
    // }
    return this.transactionRepo.find({
      relations: ['orders', 'user', 'payments'],
    });
  }

  async findOne(id: number): Promise<Transaction | null> {
    return this.transactionRepo.findOneBy({ id });
  }

  async update(
    id: number,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction | null> {
    await this.transactionRepo.update(id, updateTransactionDto);
    return this.transactionRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.transactionRepo.delete(id);
  }
}
