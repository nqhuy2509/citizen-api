import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'first_name', type: 'varchar', length: 255 })
	firstName: string;

	@Column({ name: 'last_name', type: 'varchar', length: 255 })
	lastName: string;

	@Column({ name: 'dob', type: 'date', nullable: true })
	dob: Date;

	@Column({ name: 'user_id', type: 'uuid' })
	userId: string;

	@Column({ name: 'citizen_id', type: 'varchar', length: 13 })
	citizenId: string;

	@CreateDateColumn({ name: 'created_at', type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
	updatedAt: Date;
}
