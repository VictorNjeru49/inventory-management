import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Public } from 'src/auth/decoractors/public.decorator';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @ApiTags('Seed')
  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  seed() {
    return this.seedService.seed();
  }
}
