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
  Request,
  ForbiddenException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Public } from 'src/auth/decoractors/public.decorator';
import { Roles } from 'src/auth/decoractors/role.decorator';
import { ExemptionFilter } from './guard/filter.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AtGuard } from 'src/auth/guards';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { UserRole } from './common/role.enum';

@ApiTags('Users')
@ApiBearerAuth('AccessToken')
@Controller('users')
@UseGuards(AtGuard, RoleGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly exemptionFilter: ExemptionFilter,
  ) {}

  @Post()
  @Public()
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filter profiles by search',
  })
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Get()
  findAll(@Query('search') search?: string) {
    return this.usersService.findAll(search);
  }

  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.USER)
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: { id: number; role: UserRole } },
  ): Promise<any> {
    const requesterId = req.user.id;
    const userRole = req.user.role;
    const hasAccess = await this.exemptionFilter.exceptionFilter(
      id,
      requesterId,
      userRole,
    );
    if (!hasAccess) {
      throw new ForbiddenException('Access denied');
    }
    return this.usersService.findOne(id);
  }

  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.USER)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.USER)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
