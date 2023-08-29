import { Injectable } from '@nestjs/common';
import { Admin } from '../entities/admin.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminRepository {
	constructor(
		@InjectRepository(Admin)
		private readonly adminRepository: Repository<Admin>,
	) {}

	async findUnique(username: string): Promise<Admin> {
		return this.adminRepository.findOne({
			where: {
				username: username,
			},
		});
	}

	async create(admin: Admin): Promise<Admin> {
		return this.adminRepository.save(admin);
	}
}
