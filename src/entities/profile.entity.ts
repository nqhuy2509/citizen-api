import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Apartment } from './apartment.entity';
import { User } from './user.entity';

@Entity({ name: 'profiles' })
export class Profile {
	@PrimaryColumn({ name: 'id', type: 'varchar', length: 255 })
	id: string;

	@Column({ name: 'first_name', type: 'varchar', length: 255 })
	firstName: string;

	@Column({ name: 'last_name', type: 'varchar', length: 255 })
	lastName: string;

	@Column({ name: 'dob', type: 'date', nullable: true })
	dob: Date;

	@Column({ name: 'national_id', type: 'varchar', length: 13, unique: true })
	nationalId: string;

	@Column({
		name: 'phone_number',
		type: 'varchar',
		length: 10,
		nullable: true,
	})
	phoneNumber: string;

	@CreateDateColumn({ name: 'created_at', type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
	updatedAt: Date;

	@OneToOne(() => User)
	@JoinColumn()
	user: User;

	@ManyToOne(() => Apartment, (apartment) => apartment.profiles)
	apartment: Apartment;
}
