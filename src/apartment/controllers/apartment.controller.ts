import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApartmentService } from '../services/apartment.service';
import { AdminGuard } from '../../guards/admin.guard';
import { RoleGuard } from '../../guards/role.guard';
import { Roles } from '../../decorators/role.decorator';
import { RoleAdmin } from '../../utils/enum';
import { Request } from 'express';

@Controller('apartment')
export class ApartmentController {
	constructor(private readonly apartmentService: ApartmentService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	@UseGuards(AdminGuard, RoleGuard)
	@Roles(RoleAdmin.SUPER_ADMIN, RoleAdmin.ADMIN)
	async findAllApartment(@Req() req: Request) {
		const apartments = await this.apartmentService.findAllApartment(
			req.query,
		);
		return {
			statusCode: HttpStatus.OK,
			message: 'Get all apartment successfully',
			data: apartments,
		};
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@UseGuards(AdminGuard, RoleGuard)
	@Roles(RoleAdmin.SUPER_ADMIN, RoleAdmin.ADMIN)
	async createApartment() {}
}
