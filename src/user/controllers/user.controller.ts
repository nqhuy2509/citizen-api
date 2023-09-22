import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Req,
	UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Roles } from '../../decorators/role.decorator';
import { RoleAdmin } from '../../utils/enum';
import { RoleGuard } from '../../guards/role.guard';
import { AdminGuard } from '../../guards/admin.guard';
import { ResponseCustom } from '../../utils/response';
import { Request } from 'express';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@UseGuards(AdminGuard, RoleGuard)
	@Roles(RoleAdmin.SUPER_ADMIN, RoleAdmin.ADMIN)
	@HttpCode(HttpStatus.OK)
	async getAllUser(@Req() req: Request) {
		const query = req.query;
		const users = await this.userService.getAllUser(query);

		return ResponseCustom(
			HttpStatus.OK,
			'Get all user successfully',
			users,
		);
	}
}
