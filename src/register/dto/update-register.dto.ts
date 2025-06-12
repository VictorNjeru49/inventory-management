import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRegisterDto } from './create-register.dto';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { UserRole } from 'src/users/common/role.enum';

export class UpdateRegisterDto extends PartialType(CreateRegisterDto) {
  @ApiProperty()
  @IsNumber()
  userId: number;
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsEnum(UserRole)
  role?: UserRole | undefined;
  @ApiProperty()
  password?: string | undefined;
}
