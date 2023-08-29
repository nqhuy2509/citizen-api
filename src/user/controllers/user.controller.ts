import { Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Roles } from '../../decorators/role.decorator';
import { RoleAdmin } from '../../enums/role.admin';
import { RoleGuard } from '../../guards/role.guard';
import { AdminGuard } from '../../guards/admin.guard';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@UseGuards(AdminGuard, RoleGuard)
	@Roles(RoleAdmin.SUPER_ADMIN, RoleAdmin.ADMIN)
	async createUser() {
		return { success: true };
	}
}
