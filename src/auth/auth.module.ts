import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Auth } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AtGuard } from './guards';
import { AtStrategy } from './strategies';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, Auth]),
    JwtModule.register({
      global: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt-at' }), // Set default strategy
  ],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, AtGuard], // Add AtStrategy and AtGuard here
  exports: [AtGuard], // Export AtGuard if needed in other modules
})
export class AuthModule {}
