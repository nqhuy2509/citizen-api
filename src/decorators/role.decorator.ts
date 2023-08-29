import { SetMetadata } from '@nestjs/common';
import { RoleAdmin } from '../enums/role.admin';
import { ROLE_KEY } from '../constants/string.constant';

export const Roles = (...roles: RoleAdmin[]) => SetMetadata(ROLE_KEY, roles);
