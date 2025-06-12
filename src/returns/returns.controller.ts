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
import { ReturnsService } from './returns.service';
import { CreateReturnDto, UpdateReturnDto } from './dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AtGuard } from 'src/auth/guards';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decoractors/role.decorator';
import { UserRole } from 'src/users/common/role.enum';

@ApiTags('Returnee')
@ApiBearerAuth('AccessToken')
@Controller('returns')
@UseGuards(AtGuard, RoleGuard)
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.USER)
  @Post()
  create(@Body(new ValidationPipe()) createReturnDto: CreateReturnDto) {
    return this.returnsService.create(createReturnDto);
  }

  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filter profiles by search',
  })
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.USER)
  @Get()
  findAll(@Query('search') search?: number) {
    return this.returnsService.findAll(search);
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.returnsService.findOne(id);
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.USER)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReturnDto: UpdateReturnDto,
  ) {
    return this.returnsService.update(id, updateReturnDto);
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.returnsService.remove(id);
  }
}
