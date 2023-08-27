import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Profile } from '../entities/profile.entity';
import { UserRepository } from '../repositories/user.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Profile]),
		JwtModule.registerAsync({
			useFactory: async () => ({
				secret: process.env.JWT_SECRET_KEY,
			}),
		}),
	],
	providers: [AuthService, UserRepository],
	controllers: [AuthController],
})
export class UserModule {}
