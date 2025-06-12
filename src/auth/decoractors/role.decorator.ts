import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/common/role.enum';

export const rolesKey = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(rolesKey, roles);
