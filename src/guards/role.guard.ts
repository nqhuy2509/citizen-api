import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleAdmin } from '../utils/enum';
import { ROLE_KEY } from '../constants/string.constant';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<RoleAdmin[]>(
			ROLE_KEY,
			[context.getHandler(), context.getClass()],
		);
		if (!requiredRoles) {
			return true;
		}

		const request = context.switchToHttp().getRequest();

		const userRoles = request.admin.role;
		return requiredRoles.some((role) => userRoles?.includes(role));
	}
}
