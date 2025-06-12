import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/users/common/role.enum';

export class CreateRegisterDto {
  @ApiProperty({ description: 'First name of the user', example: 'John' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', example: 'securePassword123' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: 'User role', example: 'USER' })
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}
