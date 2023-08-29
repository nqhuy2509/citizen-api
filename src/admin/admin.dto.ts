import { IsNotEmpty } from 'class-validator';

export class LoginDto {
	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	password: string;
}

export class RegisterDto {
	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	password: string;

	@IsNotEmpty()
	role: string;
}
