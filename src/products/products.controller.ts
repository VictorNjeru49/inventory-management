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
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AtGuard } from 'src/auth/guards';
import { CheckPolicies } from 'src/casl/decorators/check-policies.decorator';
import { PolicyGuard } from 'src/casl/guards/policies.guard';
import { Action } from 'src/casl/action.enum';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/users/common/role.enum';

interface ProductsRequset extends Request {
  user: User;
}

@ApiTags('Products')
@ApiBearerAuth('AccessToken')
@Controller('products')
@UseGuards(AtGuard, PolicyGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @CheckPolicies((res) => res.can(Action.Create, 'products'))
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: ProductsRequset,
  ) {
    const product = req.user;
    if (product.role === UserRole.ADMIN || UserRole.MANAGER) {
      return this.productsService.create(createProductDto);
    }
    throw new ForbiddenException('Unauthorized to create Products');
  }

  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filter products by search',
  })
  @CheckPolicies((res) => res.can(Action.Read, 'products'))
  @Get()
  findAll(@Query('search') search?: string) {
    return this.productsService.findAll(search);
  }

  @CheckPolicies((res) => res.can(Action.Read, 'products'))
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @CheckPolicies((res) => res.can(Action.Update, 'products'))
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req: ProductsRequset,
  ) {
    const user = req.user;
    if (user.role === UserRole.ADMIN || UserRole.MANAGER) {
      return this.productsService.update(id, updateProductDto);
    }
    throw new ForbiddenException('Unauthorized to update Products');
  }

  @CheckPolicies((res) => res.can(Action.Delete, 'products'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: ProductsRequset) {
    const user = req.user;
    if (user.role === UserRole.ADMIN || UserRole.MANAGER) {
      return this.productsService.remove(id);
    }
    throw new ForbiddenException('Unauthorized to delete Products');
  }
}
