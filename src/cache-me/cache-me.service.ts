import { Injectable } from '@nestjs/common';
import { CreateCacheMeDto } from './dto/create-cache-me.dto';
import { UpdateCacheMeDto } from './dto/update-cache-me.dto';

@Injectable()
export class CacheMeService {
  create(createCacheMeDto: CreateCacheMeDto) {
    return 'This action adds a new cacheMe';
  }

  findAll() {
    return `This action returns all cacheMe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cacheMe`;
  }

  update(id: number, updateCacheMeDto: UpdateCacheMeDto) {
    return `This action updates a #${id} cacheMe`;
  }

  remove(id: number) {
    return `This action removes a #${id} cacheMe`;
  }
}
