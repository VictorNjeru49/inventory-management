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
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AtGuard } from 'src/auth/guards';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decoractors/role.decorator';
import { UserRole } from 'src/users/common/role.enum';

@ApiTags('Transactions')
@ApiBearerAuth('AccessToken')
@Controller('transactions')
@UseGuards(AtGuard, RoleGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @Body(new ValidationPipe()) createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(createTransactionDto);
  }

  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filter profiles by search',
  })
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.USER)
  @Get()
  findAll(@Query('search') search?: number) {
    return this.transactionsService.findAll(search);
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.USER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.findOne(id);
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(id, updateTransactionDto);
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.USER)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.transactionsService.remove(id);
  }
}
