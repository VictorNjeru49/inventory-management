import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: 'User password', example: 'securePassword123' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
