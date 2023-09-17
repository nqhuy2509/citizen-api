import { Injectable } from '@nestjs/common';
import { Building } from '../entities/building.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BuildingRepository {
	constructor(
		@InjectRepository(Building)
		private readonly buildingRepository: Repository<Building>,
	) {}

	async findBuildingById(id: string): Promise<Building> {
		return this.buildingRepository.findOne({
			where: {
				id: id,
			},
		});
	}
}
