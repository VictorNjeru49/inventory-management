import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { PolicyGuard } from './guards/policies.guard';

@Module({
  providers: [CaslAbilityFactory, PolicyGuard],
  exports: [CaslAbilityFactory, PolicyGuard],
})
export class CaslModule {}
