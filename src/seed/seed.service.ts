import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    @InjectRepository(User)
    private readonly UserRepo: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}
  async seed() {
    this.logger.log('Started Seeding the databse');
    this.logger.log('Clearing the database');
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.query('DELETE FROM User');
      await queryRunner.commitTransaction();
      this.logger.log('all tables cleared successfully');
    } catch (error) {
      this.logger.error('Error During seeding', error);
      throw new Error('failed transaction');
    } finally {
      await queryRunner.release();
    }

    this.logger.log('seeding data');
    const users: User[] = [];
    const userstitle = ['John Doe', 'Jane Doe'];

    for (const name of userstitle) {
      const user = new User();
      user.firstName = name;
      user.lastName = name;
      user.email = faker.person.fullName();
      users.push(await this.UserRepo.save(user));
    }
  }
}
