import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	password: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	citizenId: string;
}

export class VerifyDto {
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	code: string;
}

export class LoginDto {
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	password: string;
}
