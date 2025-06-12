import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto, UpdateInventoryDto } from './dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AtGuard } from 'src/auth/guards';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decoractors/role.decorator';
import { UserRole } from 'src/users/common/role.enum';

@ApiTags('Inventory')
@ApiBearerAuth('AccessToken')
@Controller('inventory')
@UseGuards(AtGuard, RoleGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Post()
  create(@Body(new ValidationPipe()) createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filter profiles by search',
  })
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Get()
  findAll(@Query('search') search?: number) {
    return this.inventoryService.findAll(search);
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryService.findOne(id);
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoryService.update(id, updateInventoryDto);
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.inventoryService.remove(id);
  }
}
