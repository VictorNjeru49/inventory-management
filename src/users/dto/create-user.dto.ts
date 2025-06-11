import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'First name of the user', example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', example: 'securePassword123' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'User role', example: 'ADMIN' })
  @IsString()
  @IsEnum(UserRole, { message: 'Role must be an administrator or user' })
  role: UserRole;

  @ApiProperty({ description: 'Is the user active?', example: true })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
