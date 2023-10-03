import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEnum } from '../utils/enum';
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

	async findAllUser(): Promise<User[]> {
		return this.userRepository.find({
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

	async updateStatusUser(id: string, status: UserEnum) {
		return this.userRepository.update(id, { status: status });
	}

	async updateVerifyCode(id: string, verifyCode: string) {
		return this.userRepository.update(id, { verifyCode: verifyCode });
	}

	async getAllUser() {
		return this.userRepository
			.createQueryBuilder('user')
			.leftJoinAndSelect('user.profile', 'profile')
			.getMany();
	}
}
