import { BadRequestException, Injectable } from '@nestjs/common';
import { ProfileRepository } from '../../repositories/profile.repository';
import { CreateProfileDto } from '../dto/profile.dto';
import { ApartmentRepository } from '../../repositories/apartment.repository';
import { Profile } from '../../entities/profile.entity';
import * as moment from 'moment';

@Injectable()
export class ProfileService {
	constructor(
		private readonly profileRepository: ProfileRepository,
		private readonly apartmentRepository: ApartmentRepository,
	) {}

	async createProfile(dto: CreateProfileDto): Promise<Profile> {
		const existProfile = await this.profileRepository.findByNationalId(
			dto.nationalId,
		);

		if (existProfile) {
			throw new BadRequestException('Profile already exist');
		}

		const existApartment = await this.apartmentRepository.findById(
			dto.apartmentId,
		);

		if (!existApartment) {
			throw new BadRequestException('Apartment not found');
		}

		const building = existApartment.building;
		const zone = building.zone;

		const findMembers =
			await this.profileRepository.findAllProfileByApartmentId(
				dto.apartmentId,
			);

		const memberIds = findMembers.map((member) => member.id);

		const profileId = this.createProfileId(
			existApartment.id,
			building.id,
			zone.id,
			memberIds,
		);

		const profile = new Profile();

		const formatDob = moment(dto.dob, 'DD/MM/YYYY').toDate();

		profile.id = profileId;
		profile.nationalId = dto.nationalId;
		profile.firstName = dto.firstName;
		profile.lastName = dto.lastName;
		profile.dob = formatDob;
		profile.phoneNumber = dto.phoneNumber;
		profile.apartment = existApartment;

		return await this.profileRepository.create(profile);
	}

	private createProfileId(
		apartmentId: string,
		buildingId: string,
		zoneId: string,
		membersId: string[],
	): string {
		let existId = false;
		let newId: string;

		do {
			const randomId = Math.floor(Math.random() * 10000);
			newId = `${apartmentId.slice(-2)}${buildingId.slice(
				-2,
			)}${zoneId.slice(-2)}${randomId}`;
			existId = membersId.includes(newId);
		} while (existId);

		return newId;
	}
}
