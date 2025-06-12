import { Injectable } from '@nestjs/common';
import { Action } from '../action.enum';
import { AppAbility } from '../casl-ability.factory';

@Injectable()
export class ProductPolicies {
  static read(ability: AppAbility) {
    return ability.can(Action.Read, 'products');
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create, 'products');
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update, 'products');
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete, 'products');
  }
}

@Injectable()
export class CategoryPolicies {
  static read(ability: AppAbility) {
    return ability.can(Action.Read, 'categories');
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create, 'categories');
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update, 'categories');
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete, 'categories');
  }
}

@Injectable()
export class OrderPolicies {
  static read(ability: AppAbility) {
    return ability.can(Action.Read, 'orders');
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create, 'orders');
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update, 'orders');
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete, 'orders');
  }
}

@Injectable()
export class OrderItemPolicies {
  static read(ability: AppAbility) {
    return ability.can(Action.Read, 'order-items');
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create, 'order-items');
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update, 'order-items');
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete, 'order-items');
  }
}

@Injectable()
export class InventoryPolicies {
  static read(ability: AppAbility) {
    return ability.can(Action.Read, 'inventory');
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create, 'inventory');
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update, 'inventory');
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete, 'inventory');
  }
}

@Injectable()
export class SupplierPolicies {
  static read(ability: AppAbility) {
    return ability.can(Action.Read, 'supplier');
  }

  static create(ability: AppAbility) {
    return ability.can(Action.Create, 'supplier');
  }

  static update(ability: AppAbility) {
    return ability.can(Action.Update, 'supplier');
  }

  static delete(ability: AppAbility) {
    return ability.can(Action.Delete, 'supplier');
  }
}
