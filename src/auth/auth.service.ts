import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as Bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import nodemailer from 'nodemailer';

export interface JwtPayload {
  sub: number;
  email: string;
  iat?: number;
  exp?: number;
}
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private async getTokens(userId: number, email: string, role: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email: email, role: role },
        {
          secret: this.configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.getOrThrow<string>(
            'ACCESS_TOKEN_EXPIRES_IN',
          ),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
          role: role,
        },
        {
          secret: this.configService.getOrThrow<string>('REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.getOrThrow<string>(
            'REFRESH_TOKEN_EXPIRES_IN',
          ),
        },
      ),
    ]);

    return { accessToken: at, refreshToken: rt };
  }
  private async hashData(data: string): Promise<string> {
    const salt = await Bcrypt.genSalt(10);
    return await Bcrypt.hash(data, salt);
  }

  private async saveRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userRepository.update(userId, {
      hashedRefreshToken: hashedRefreshToken,
    });
  }

  async forgetPassword(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    const resetToken = await this.jwtService.signAsync(
      { sub: user.id, email: user.email },
      {
        secret: this.configService.getOrThrow<string>('RESET_TOKEN_SECRET'),
        expiresIn: this.configService.getOrThrow<string>(
          'RESET_TOKEN_EXPIRES_IN',
        ),
      },
    );

    await this.sendResetPasswordEmail(email, resetToken);
    console.log(`The reset access is: ${resetToken}`);
    return `The reset access is: ${resetToken}`;
  }

  private async sendResetPasswordEmail(
    email: string,
    token: string,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.getOrThrow<string>('SMTP_USER'),
        pass: this.configService.getOrThrow<string>('SMTP_PASS'),
      },
    });

    const resetUrl = `${this.configService.getOrThrow<string>('FRONTEND_URL')}/reset-password?token=${token}`;
    const htmlContent = `<p>To reset your password, please click the link below:</p>
                         <a href="${resetUrl}">Reset Password</a>`;

    try {
      await transporter.sendMail({
        from: `"Your App" <${this.configService.getOrThrow<string>('SMTP_USER')}>`,
        to: email,
        subject: 'Password Reset Request',
        html: htmlContent,
      });
      console.log(`Reset password email sent to: ${email}`);
    } catch (error) {
      console.error('Error sending reset password email:', error);
      throw new Error('Could not send reset password email.');
    }
  }

  async SignIn(createAuthDto: CreateAuthDto) {
    const foundUser = await this.userRepository.findOne({
      where: { email: createAuthDto.email },
      select: ['id', 'email', 'password', 'role', 'hashedRefreshToken'],
    });

    if (!foundUser) {
      throw new NotFoundException(
        `User with email ${createAuthDto.email} not found`,
      );
    }

    const isPasswordValid = await Bcrypt.compare(
      createAuthDto.password,
      foundUser.password,
    );

    if (!isPasswordValid) {
      throw new NotFoundException(`Invalid credentials`);
    }

    const { accessToken, refreshToken } = await this.getTokens(
      foundUser.id,
      foundUser.email,
      foundUser.role,
    );

    await this.saveRefreshToken(foundUser.id, refreshToken);
    return { accessToken, refreshToken };
  }

  async signOut(userId: number) {
    const res = await this.userRepository.findOne({
      where: { id: userId },
      select: ['id', 'email', 'password', 'role'],
    });

    if (!res) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    await this.userRepository.update(userId, {
      hashedRefreshToken: null,
    });
    return { message: `User with id : ${userId} signed out successfully` };
  }

  async refreshTokens(id: number, refreshToken: string) {
    const foundUser = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'hashedRefreshToken'],
    });

    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (!foundUser.hashedRefreshToken) {
      throw new NotFoundException('No refresh token stored for this user');
    }

    const isValidRefreshToken = await Bcrypt.compare(
      refreshToken,
      foundUser.hashedRefreshToken,
    );

    if (!isValidRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const { accessToken, refreshToken: newRefreshToken } = await this.getTokens(
      foundUser.id,
      foundUser.email,
      foundUser.role,
    );

    const hashedRefreshToken = await Bcrypt.hash(newRefreshToken, 10);
    await this.saveRefreshToken(foundUser.id, hashedRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.configService.getOrThrow<string>('RESET_TOKEN_SECRET'),
      });
    } catch {
      throw new BadRequestException('Invalid or expired token');
    }

    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
      select: ['id', 'email'],
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    const hashedPassword = await Bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await this.userRepository.save(user);
  }
}
