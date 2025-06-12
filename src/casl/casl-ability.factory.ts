import { AbilityBuilder, PureAbility } from '@casl/ability';
import { Action } from './action.enum';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/users/common/role.enum';

export type Subject =
  | 'products'
  | 'categories'
  | 'orders'
  | 'order-items'
  | 'inventory'
  | 'supplier'
  | 'all';

export type AppAbility = PureAbility<[Action, Subject]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User): AppAbility {
    const { can, build } = new AbilityBuilder<AppAbility>(PureAbility);

    if (user.role === UserRole.ADMIN) {
      can(Action.Manage, 'all');
    } else if (user.role === UserRole.MANAGER) {
      can(Action.Read, 'products');
      can(Action.Read, 'orders');
      can(Action.Update, 'orders');
      can(Action.Create, 'categories');
      can(Action.Delete, 'categories');
    } else if (user.role === UserRole.USER) {
      can(Action.Read, 'products');
      can(Action.Read, 'orders');
    }

    return build();
  }
}
