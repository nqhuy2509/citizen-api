import {
	Column,
	CreateDateColumn,
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { UserEnum } from '../utils/enum';
import { Profile } from './profile.entity';

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'email', type: 'varchar', length: 255, unique: true })
	email: string;

	@Column({ name: 'password', type: 'varchar', length: 255 })
	password: string;

	@Column({ name: 'verify_code', type: 'varchar', length: 255 })
	verifyCode: string;

	@Column({
		default: UserEnum.PENDING,
		type: 'enum',
		enum: UserEnum,
		enumName: 'status',
	})
	status: UserEnum;

	@CreateDateColumn({ name: 'created_at', type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
	updatedAt: Date;

	@OneToOne(() => Profile, (profile) => profile.user)
	profile: Profile;
}
