import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminRepository } from '../repositories/admin.repository';
import { LoginDto, RegisterDto } from './admin.dto';
import { Admin } from '../entities/admin.entity';
import { RoleAdmin } from '../utils/enum';
import * as bcrypt from 'bcrypt';

type TokenResponse = {
	username: string;
	role: string;
	accessToken: string;
};

type Payload = {
	username: string;
	role: RoleAdmin;
};

@Injectable()
export class AdminService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly adminRepository: AdminRepository,
	) {}

	async loginAdmin(dto: LoginDto): Promise<TokenResponse> {
		const admin = await this.adminRepository.findUnique(dto.username);

		if (!admin) {
			throw new NotFoundException('Admin not found');
		}

		const isPasswordValid = await bcrypt.compare(
			dto.password,
			admin.password,
		);

		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid password');
		}

		const payload: Payload = {
			username: admin.username,
			role: admin.role,
		};

		return {
			username: admin.username,
			role: admin.role,
			accessToken: this.jwtService.sign(payload),
		};
	}

	async registerAdmin(dto: RegisterDto): Promise<TokenResponse> {
		const admin = await this.adminRepository.findUnique(dto.username);

		if (admin) {
			throw new BadRequestException('Admin already exists');
		}

		const newAdmin = new Admin();
		newAdmin.username = dto.username;
		newAdmin.password = await bcrypt.hash(dto.password, 10);
		newAdmin.role = RoleAdmin[dto.role.toUpperCase()];

		await this.adminRepository.create(newAdmin);

		const payload: Payload = {
			username: dto.username,
			role: newAdmin.role,
		};

		return {
			username: dto.username,
			role: dto.role,
			accessToken: this.jwtService.sign(payload),
		};
	}

	async verifyAdmin(token: string): Promise<Payload> {
		const payload = this.jwtService.verify(token);
		const admin = await this.adminRepository.findUnique(payload.username);

		if (!admin) {
			throw new Error('Admin not found');
		}

		return payload;
	}
}
