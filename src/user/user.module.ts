import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		JwtModule.registerAsync({
			useFactory: async () => ({
				secret: process.env.JWT_SECRET_KEY,
			}),
		}),
	],
	providers: [AuthService],
	controllers: [AuthController],
})
export class UserModule {}
