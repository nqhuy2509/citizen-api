import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from '../repositories/admin.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([Admin]),
		JwtModule.registerAsync({
			useFactory: async () => ({
				secret: process.env.JWT_SECRET_KEY_ADMIN,
			}),
		}),
	],
	controllers: [AdminController],
	providers: [AdminService, AdminRepository],
})
export class AdminModule {}
