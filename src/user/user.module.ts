import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Profile } from '../entities/profile.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserController } from './controllers/user.controller';
import { AdminService } from '../admin/admin.service';
import { AdminRepository } from '../repositories/admin.repository';
import { UserService } from './services/user.service';
import { Admin } from '../entities/admin.entity';
import { ProfileRepository } from '../repositories/profile.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Profile, Admin]),
		JwtModule.registerAsync({
			useFactory: async () => ({
				secret: process.env.JWT_SECRET_KEY,
			}),
		}),
	],
	providers: [
		AuthService,
		UserRepository,
		AdminRepository,
		AdminService,
		UserService,
		ProfileRepository,
	],
	controllers: [AuthController, UserController],
})
export class UserModule {}
