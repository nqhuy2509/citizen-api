import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Building } from './building.entity';
import { Profile } from './profile.entity';

@Entity({ name: 'apartments' })
export class Apartment {
	@PrimaryColumn({ name: 'id', type: 'varchar', length: 255 })
	id: string;

	@Column({ name: 'floor', type: 'int', nullable: true })
	floor: number;

	@OneToMany(() => Profile, (profile) => profile.apartment)
	profiles: Profile[];

	@ManyToOne(() => Building, (building) => building.apartments)
	building: Building;
}
