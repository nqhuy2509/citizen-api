import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Building } from './building.entity';
import { Profile } from './profile.entity';
import { StatusApartment, TypeApartment } from '../utils/enum';

@Entity({ name: 'apartments' })
export class Apartment {
	@PrimaryColumn({ name: 'id', type: 'varchar', length: 255 })
	id: string;

	@Column({ name: 'floor', type: 'int', nullable: true })
	floor: number;

	@Column({
		name: 'type',
		enum: TypeApartment,
		enumName: 'type',
		type: 'enum',
		nullable: true,
	})
	type: TypeApartment;

	@Column({
		name: 'status',
		enum: StatusApartment,
		enumName: 'statusApartment',
		type: 'enum',
		default: StatusApartment.AVAILABLE,
	})
	status: StatusApartment;

	@OneToMany(() => Profile, (profile) => profile.apartment)
	profiles: Profile[];

	@ManyToOne(() => Building, (building) => building.apartments)
	building: Building;
}
