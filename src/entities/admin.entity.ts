import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleAdmin } from '../utils/enum';

@Entity({ name: 'admins' })
export class Admin {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'username', type: 'varchar', length: 255, unique: true })
	username: string;

	@Column({ name: 'password', type: 'varchar', length: 255 })
	password: string;

	@Column({
		name: 'role',
		type: 'enum',
		enum: RoleAdmin,
		enumName: 'role',
		default: RoleAdmin.ADMIN,
	})
	role: RoleAdmin;

	@Column({
		name: 'created_at',
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@Column({
		name: 'updated_at',
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	updatedAt: Date;
}
