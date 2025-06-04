import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCacheMeDto {
  @ApiProperty({ description: 'Unique key', example: 'user' })
  @IsString()
  key: string;
  @ApiProperty()
  @IsString()
  value: string;
  @ApiProperty({ description: 'time out', required: false })
  @IsInt()
  @IsOptional()
  ttl?: number;
}
