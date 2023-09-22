import {
	Column,
	Entity,
	OneToMany,
	PrimaryColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Building } from './building.entity';

@Entity({ name: 'zones' })
export class Zone {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'name', type: 'varchar', length: 255 })
	name: string;

	@OneToMany(() => Building, (building) => building.zone)
	buildings: Building[];
}
