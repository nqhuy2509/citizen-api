import { Injectable } from '@nestjs/common';
import { ApartmentRepository } from '../../repositories/apartment.repository';

@Injectable()
export class ApartmentService {
	constructor(private readonly apartmentRepository: ApartmentRepository) {}

	async findAllApartment(query: any): Promise<any> {
		if (query.status) {
			return this.apartmentRepository.findManyByStatus(query.status);
		}
		return this.apartmentRepository.findAll();
	}
}
