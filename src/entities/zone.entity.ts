import {
	Column,
	Entity,
	OneToMany,
	PrimaryColumn,
} from 'typeorm';
import { Building } from './building.entity';

@Entity({ name: 'zones' })
export class Zone {
	@PrimaryColumn({ name: 'id', type: 'varchar', length: 255 })
	id: string;

	@Column({ name: 'name', type: 'varchar', length: 255 })
	name: string;

	@OneToMany(() => Building, (building) => building.zone)
	buildings: Building[];
}
