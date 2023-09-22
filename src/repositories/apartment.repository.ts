import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Apartment } from '../entities/apartment.entity';

@Injectable()
export class ApartmentRepository {
	constructor(
		@InjectRepository(Apartment)
		private readonly apartmentRepository: Repository<Apartment>,
	) {}

	async create(apartment: Apartment): Promise<Apartment> {
		return this.apartmentRepository.save(apartment);
	}

	async findById(id: string): Promise<Apartment> {
		return this.apartmentRepository
			.createQueryBuilder('apartment')
			.leftJoinAndSelect('apartment.building', 'building')
			.leftJoinAndSelect('building.zone', 'zone')
			.where('apartment.id = :id', { id: id })
			.getOne();
	}

	async findAllApartment(): Promise<any> {
		return this.apartmentRepository.find({
			relations: ['building', 'building.zone'],
		});
	}
}
