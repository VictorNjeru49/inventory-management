import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CacheMeService } from './cache-me.service';
import { CreateCacheMeDto } from './dto/create-cache-me.dto';
import { UpdateCacheMeDto } from './dto/update-cache-me.dto';

@Controller('cache-me')
export class CacheMeController {
  constructor(private readonly cacheMeService: CacheMeService) {}

  @Post()
  create(@Body() createCacheMeDto: CreateCacheMeDto) {
    return this.cacheMeService.create(createCacheMeDto);
  }

  @Get()
  findAll() {
    return this.cacheMeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cacheMeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCacheMeDto: UpdateCacheMeDto) {
    return this.cacheMeService.update(+id, updateCacheMeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cacheMeService.remove(+id);
  }
}
