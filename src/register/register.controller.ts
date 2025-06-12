import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto, UpdateRegisterDto } from './dto';
import { Public } from 'src/auth/decoractors/public.decorator';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AtGuard } from 'src/auth/guards';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decoractors/role.decorator';
import { UserRole } from 'src/users/common/role.enum';

@ApiTags('Register')
@ApiBearerAuth('AccessToken')
@Controller('register')
@UseGuards(AtGuard, RoleGuard)
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}
  @Public()
  @Post()
  create(@Body() createRegisterDto: CreateRegisterDto) {
    return this.registerService.create(createRegisterDto);
  }
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filter profiles by search',
  })
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Get()
  findAll() {
    return this.registerService.findAll();
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.USER)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.registerService.findOne(id);
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateRegisterDto: UpdateRegisterDto,
  ) {
    return this.registerService.update(id, updateRegisterDto);
  }
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.registerService.remove(id);
  }
}
