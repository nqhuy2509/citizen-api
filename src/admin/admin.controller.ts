import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginDto, RegisterDto } from './admin.dto';
import { ResponseCustom } from 'src/utils/response';

@Controller('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	async loginAdmin(@Body() dto: LoginDto) {
		const data = await this.adminService.loginAdmin(dto);
		return ResponseCustom(HttpStatus.OK, 'Login admin successfully', data);
	}

	@Post('register')
	async registerAdmin(@Body() dto: RegisterDto) {
		return this.adminService.registerAdmin(dto);
	}
}
