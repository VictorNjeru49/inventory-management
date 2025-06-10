import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExemptionFilter {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async exceptionFilter(
    userId: number,
    requesterId: number,
    userRole: UserRole,
  ): Promise<boolean> {
    const requesterUser = await this.userRepo.findOne({
      where: { id: requesterId },
    });

    if (!requesterUser || requesterUser.isActive === false) {
      return false;
    }

    switch (userRole) {
      case UserRole.USER:
        return requesterUser.id === userId;
      case UserRole.ADMIN || UserRole.MANAGER:
        return true;
      default:
        return false;
    }
  }
}
