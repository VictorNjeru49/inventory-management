import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return `This action adds a new user with name ${createUserDto.firstName} ${createUserDto.lastName}`;
  }

  findAll(search?: string) {
    if (search) {
      return `This action returns all users matching the search term: ${search}`;
    }
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.firstName || updateUserDto.lastName) {
      return `This action updates user #${id} with name ${updateUserDto.firstName} ${updateUserDto.lastName}`;
    }
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
