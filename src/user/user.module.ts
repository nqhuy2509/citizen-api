import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		JwtModule.registerAsync({
			useFactory: async () => ({
				secret: process.env.JWT_SECRET_KEY,
				signOptions: {
					expiresIn: process.env.JWT_EXPIRES_IN,
				},
			}),
		}),
	],
	providers: [AuthService],
	controllers: [AuthController],
})
export class UserModule {}
