import { PartialType } from '@nestjs/mapped-types';
import { CreateReturnDto } from './create-return.dto';
import { IsNumber } from 'class-validator';

export class UpdateReturnDto extends PartialType(CreateReturnDto) {
  @IsNumber()
  id: number;
}
