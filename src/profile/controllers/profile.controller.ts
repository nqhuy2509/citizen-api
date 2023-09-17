import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../../guards/admin.guard';
import { RoleGuard } from '../../guards/role.guard';
import { Roles } from '../../decorators/role.decorator';
import { RoleAdmin } from '../../enums/role.admin';
import { CreateProfileDto } from '../dto/profile.dto';
import { ResponseCustom } from '../../utils/response';
import { ProfileService } from '../services/profile.service';

@Controller('profile')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@Post()
	@UseGuards(AdminGuard, RoleGuard)
	@Roles(RoleAdmin.SUPER_ADMIN, RoleAdmin.ADMIN)
	async createProfileUser(@Body() dto: CreateProfileDto) {
		const profile = await this.profileService.createProfile(dto);
		return ResponseCustom(
			HttpStatus.CREATED,
			'User created successfully',
			profile,
		);
	}
}
