import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { ProfileRepository } from '../../repositories/profile.repository';

@Injectable()
export class UserService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly profileRepository: ProfileRepository,
	) {}

	async getAllUser(query: any) {
		if (query.all) {
			return await this.profileRepository.getAllProfileUsers();
		} else {
			return await this.userRepository.findAllUser();
		}
	}
}
