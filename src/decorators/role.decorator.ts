import { SetMetadata } from '@nestjs/common';
import { RoleAdmin } from '../utils/enum';
import { ROLE_KEY } from '../constants/string.constant';

export const Roles = (...roles: RoleAdmin[]) => SetMetadata(ROLE_KEY, roles);
