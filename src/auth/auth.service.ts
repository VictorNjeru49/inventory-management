import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as Bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private profileRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private async getTokens(userId: number, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.getOrThrow<string>(
            'ACCESS_TOKEN_EXPIRATION_TIME',
          ),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: this.configService.getOrThrow<string>('REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.getOrThrow<string>(
            'REFRESH_TOKEN_EXPIRATION_TIME',
          ),
        },
      ),
    ]);

    return { accessToken: at, refreshToken: rt };
  }

  async SignIn(createAuthDto: CreateAuthDto) {
    const foundUser = await this.profileRepository.findOne({
      where: { email: createAuthDto.email },
      select: ['id', 'email', 'password'],
    });
    if (!foundUser) {
      throw new Error(`User with email ${createAuthDto.email} not found`);
    }
    const foundPassword = await Bcrypt.compare(
      createAuthDto.password,
      foundUser.password,
    );
    if (!foundPassword) {
      throw new NotFoundException(`Invalid credentials`);
    }

    const { accessToken, refreshToken } = await this.getTokens(
      foundUser.id,
      foundUser.email,
    );
    return { accessToken, refreshToken };
  }

  async signOut(userId: number) {
    const res = await this.profileRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'hashedPassword'],
    });

    if (!res) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    await this.profileRepository.update(userId, {
      hashedPassword: null,
    });
    return { message: `User with id : ${userId} signed out successfully` };
  }

  async refreshTokens(id: number, refreshToken: string) {
    const foundUser = await this.profileRepository.findOne({
      where: { id },
      select: ['id', 'email', 'hashedPassword'],
    });

    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (!foundUser.hashedPassword) {
      throw new NotFoundException('No refresh token stored for this user');
    }
    const isRefreshedToken = await Bcrypt.compare(
      refreshToken,
      foundUser.hashedPassword,
    );

    if (!isRefreshedToken) {
      throw new NotFoundException('Invalid refresh token');
    }

    const { accessToken, refreshToken: newRefreshToken } = await this.getTokens(
      foundUser.id,
      foundUser.email,
    );
    return { accessToken, refreshToken: newRefreshToken };
  }
}
