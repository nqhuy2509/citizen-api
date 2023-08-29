import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginDto, RegisterDto } from './admin.dto';

@Controller('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Post('login')
	async loginAdmin(@Body() dto: LoginDto) {
		return this.adminService.loginAdmin(dto);
	}

	@Post('register')
	async registerAdmin(@Body() dto: RegisterDto) {
		return this.adminService.registerAdmin(dto);
	}
}
