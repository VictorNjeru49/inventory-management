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
import { PricingService } from './pricing.service';
import { CreatePricingDto, UpdatePricingDto } from './dto';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth('AccessToken')
@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Post()
  create(@Body(new ValidationPipe()) createPricingDto: CreatePricingDto) {
    return this.pricingService.create(createPricingDto);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.pricingService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pricingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePricingDto: UpdatePricingDto,
  ) {
    return this.pricingService.update(id, updatePricingDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pricingService.remove(id);
  }
}
