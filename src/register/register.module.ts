import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Register } from './entities/register.entity';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Register, User])],
  controllers: [RegisterController],
  providers: [RegisterService, RoleGuard],
})
export class RegisterModule {}
