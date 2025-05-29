import { PartialType } from '@nestjs/swagger';
import { CreateRegisterDto } from './create-register.dto';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { UserRole } from '../entities/register.entity';

export class UpdateRegisterDto extends PartialType(CreateRegisterDto) {
  @IsNumber()
  userId: number;
  @IsString()
  email: string;
  @IsEnum(UserRole)
  role?: UserRole | undefined;
}
