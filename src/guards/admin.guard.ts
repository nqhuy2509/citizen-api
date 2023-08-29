import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AdminGuard implements CanActivate {
	constructor(private readonly adminService: AdminService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		if (!request.headers.authorization) return false;
		const token = request.headers.authorization?.split(' ')[1];

		try {
			const decode = await this.adminService.verifyAdmin(token);

			if (decode) {
				request.admin = decode;
				return true;
			}
			return false;
		} catch (e) {
			return false;
		}
	}
}
