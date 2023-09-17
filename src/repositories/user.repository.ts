import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusUser } from '../enums/statusUser';
import { User } from '../entities/user.entity';

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
							nationalId: citizenId,
						},
						{
							id: citizenId,
						},
					],
				},
			],
			relations: ['profile'],
		});
	}

	async findUserAlreadyExist(id: string): Promise<User> {
		return this.userRepository.findOne({
			where: {
				profile: {
					id: id,
				},
			},
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

	async getAllUser() {
		return this.userRepository
			.createQueryBuilder('user')
			.leftJoinAndSelect('user.profile', 'profile')
			.getMany();
	}
}
