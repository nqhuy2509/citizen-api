import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfileRepository {
	constructor(
		@InjectRepository(Profile)
		private readonly profileRepository: Repository<Profile>,
	) {}

	async create(profile: Profile): Promise<Profile> {
		return this.profileRepository.save(profile);
	}

	async findByNationalId(nationalId: string): Promise<Profile> {
		return this.profileRepository.findOne({
			where: {
				nationalId: nationalId,
			},
		});
	}

	async findById(id: string): Promise<Profile> {
		return this.profileRepository.findOne({
			where: {
				id: id,
			},
		});
	}

	async findUnique(id: string): Promise<Profile> {
		return this.profileRepository.findOne({
			where: [
				{ id: id },
				{
					nationalId: id,
				},
			],
		});
	}

	async findAllProfileByApartmentId(apartmentId: string): Promise<Profile[]> {
		return this.profileRepository.find({
			where: {
				apartment: {
					id: apartmentId,
				},
			},
		});
	}

	async getAllProfileUsers(): Promise<Profile[]> {
		return this.profileRepository
			.createQueryBuilder('profile')
			.leftJoinAndSelect('profile.user', 'user')
			.getMany();
	}
}
