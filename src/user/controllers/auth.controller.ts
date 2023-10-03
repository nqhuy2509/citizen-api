import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto, RegisterDto, ResendDto, VerifyDto } from '../dto/auth.dto';
import { ResponseCustom } from 'src/utils/response';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async registerUser(@Body() dto: RegisterDto) {
		await this.authService.registerUser(dto);

		return ResponseCustom(
			HttpStatus.CREATED,
			'User created successfully',
			null,
		);
	}

	@Post('verify')
	async verifyUser(@Body() dto: VerifyDto) {
		const token = await this.authService.verifyUser(dto);
		return ResponseCustom(
			HttpStatus.OK,
			'User verified successfully',
			token,
		);
	}

	@Post('login')
	async loginUser(@Body() dto: LoginDto) {
		const token = await this.authService.loginUser(dto);

		return ResponseCustom(HttpStatus.OK, 'Login user successfully', token);
	}

	@Post('resend')
	async resendVerifyCode(@Body() dto: ResendDto) {
		await this.authService.resendVerifyCode(dto);

		return ResponseCustom(
			HttpStatus.OK,
			'Resend verify code successfully',
			null,
		);
	}
}
