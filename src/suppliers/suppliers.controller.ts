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
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto, UpdateSupplierDto } from './dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AtGuard } from 'src/auth/guards';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decoractors/role.decorator';
import { UserRole } from 'src/users/common/role.enum';

@ApiTags('Suppliers')
@ApiBearerAuth('AccessToken')
@Controller('suppliers')
@UseGuards(AtGuard, RoleGuard)
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  create(@Body(new ValidationPipe()) createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.create(createSupplierDto);
  }
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filter profiles by search',
  })
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Get()
  findAll(@Query('search') search?: string) {
    return this.suppliersService.findAll(search);
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.suppliersService.findOne(id);
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.suppliersService.update(id, updateSupplierDto);
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.suppliersService.remove(id);
  }
}
