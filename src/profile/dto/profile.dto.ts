import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateProfileDto {
	@IsNotEmpty()
	firstName: string;

	@IsNotEmpty()
	lastName: string;

	@IsNotEmpty()
	dob: Date;

	@IsNotEmpty()
	@MinLength(4)
	@MaxLength(13)
	nationalId: string;

	@IsNotEmpty()
	apartmentId: string;

	phoneNumber: string;
}
