import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusUser } from '../enums/statusUser';

@Injectable()
export class UserRepository {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async findUnique(email: string, citizenId: string): Promise<User> {
		return this.userRepository.findOne({
			where: [
				{ email: email },
				{
					profile: [
						{
							citizenId: citizenId,
						},
						{
							nationalId: citizenId,
						},
					],
				},
			],
			relations: ['profile'],
		});
	}

	async findByEmail(email: string): Promise<User> {
		return this.userRepository.findOne({
			where: {
				email: email,
			},
		});
	}

	async create(user: User): Promise<User> {
		return this.userRepository.save(user);
	}

	async updateStatusUser(id: string, status: StatusUser) {
		return this.userRepository.update(id, { status: status });
	}
}
