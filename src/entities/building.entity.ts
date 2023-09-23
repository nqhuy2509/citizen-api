import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Zone } from './zone.entity';
import { Apartment } from './apartment.entity';

@Entity({ name: 'buildings' })
export class Building {
	@PrimaryColumn({ name: 'id', type: 'varchar', length: 255 })
	id: string;

	@Column({ name: 'name', type: 'varchar', length: 255 })
	name: string;

	@Column({ name: 'num_of_floors', type: 'int', default: 0 })
	numOfFloors: number;

	@ManyToOne(() => Zone, (zone) => zone.buildings)
	zone: Zone;

	@OneToMany(() => Apartment, (apartment) => apartment.building)
	apartments: Apartment[];
}
