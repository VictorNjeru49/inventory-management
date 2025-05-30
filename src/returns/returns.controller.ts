import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ReturnsService } from './returns.service';
import { CreateReturnDto, UpdateReturnDto } from './dto';

@Controller('returns')
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}

  @Post()
  create(@Body(new ValidationPipe()) createReturnDto: CreateReturnDto) {
    return this.returnsService.create(createReturnDto);
  }

  @Get()
  findAll(@Query('search') search?: number) {
    return this.returnsService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.returnsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReturnDto: UpdateReturnDto,
  ) {
    return this.returnsService.update(+id, updateReturnDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.returnsService.remove(+id);
  }
}
