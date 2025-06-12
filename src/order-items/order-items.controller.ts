import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto, UpdateOrderItemDto } from './dto';
import { Public } from 'src/auth/decoractors/public.decorator';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AtGuard } from 'src/auth/guards';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decoractors/role.decorator';
import { UserRole } from 'src/users/common/role.enum';

@ApiTags('Order Items')
@ApiBearerAuth('AccessToken')
@Controller('order-items')
@UseGuards(AtGuard, RoleGuard)
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}
  @Public()
  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filter profiles by search',
  })
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.USER)
  @Get()
  findAll(@Query('search') search?: number) {
    return this.orderItemsService.findAll(search);
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.USER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemsService.findOne(id);
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemsService.update(id, updateOrderItemDto);
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.USER)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.orderItemsService.remove(id);
  }
}
