import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AtGuard } from 'src/auth/guards';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decoractors/role.decorator';
import { UserRole } from 'src/users/entities/user.entity';

@ApiTags('Orders')
@ApiBearerAuth('AccessToken')
@Controller('orders')
@UseGuards(AtGuard, RoleGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Post()
  create(@Body(new ValidationPipe()) createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filter profiles by search',
  })
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.USER)
  @Get()
  findAll(@Query('search') search?: number) {
    return this.ordersService.findAll(search);
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.USER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.USER)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }
}
