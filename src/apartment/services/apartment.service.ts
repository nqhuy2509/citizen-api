import { Injectable } from '@nestjs/common';
import { ApartmentRepository } from '../../repositories/apartment.repository';

@Injectable()
export class ApartmentService {
	constructor(private readonly apartmentRepository: ApartmentRepository) {
	}

	async findAllApartment(): Promise<any> {
		return this.apartmentRepository.findAllApartment();
	}
}
