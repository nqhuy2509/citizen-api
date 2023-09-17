import { Injectable } from '@nestjs/common';
import { Zone } from '../entities/zone.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ZoneRepository {
	constructor(
		@InjectRepository(Zone)
		private readonly zoneRepository: Repository<Zone>,
	) {}

	async findZoneById(id: string): Promise<Zone> {
		return this.zoneRepository.findOne({
			where: {
				id: id,
			},
		});
	}
}
