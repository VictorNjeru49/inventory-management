import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Auth } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AtGuard, RtGuard } from './guards';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, Auth]),
    JwtModule.register({
      global: true,
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, AtGuard, RtStrategy, RtGuard],
  exports: [AtGuard, RtGuard],
})
export class AuthModule {}
