import { PartialType } from '@nestjs/mapped-types';
import { CreateReturnDto } from './create-return.dto';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReturnDto extends PartialType(CreateReturnDto) {
  @ApiProperty()
  @IsNumber()
  id: number;
}
