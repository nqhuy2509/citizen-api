import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto, ResendDto, VerifyDto } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { generateVerifyCode } from '../../utils';
import { MailerService } from '@nestjs-modules/mailer';
import { UserRepository } from '../../repositories/user.repository';
import { UserEnum } from '../../utils/enum';
import { User } from '../../entities/user.entity';
import { ProfileRepository } from '../../repositories/profile.repository';

type TokenResponse = {
	email: string;
	accessToken: string;
};

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly mailerService: MailerService,
		private readonly userRepository: UserRepository,
		private readonly profileRepository: ProfileRepository,
	) {}

	async registerUser(dto: RegisterDto): Promise<User> {
		const existUser = await this.userRepository.findByEmail(dto.email);

		if (existUser) {
			throw new BadRequestException({
				code: 1001,
				message: 'This email is already registered',
			});
		}

		const existProfile = await this.profileRepository.findUnique(
			dto.citizenId,
		);

		if (!existProfile) {
			throw new NotFoundException('Your profile is not found');
		}

		const userIsRegistered = await this.userRepository.findUserAlreadyExist(
			existProfile.id,
		);

		if (userIsRegistered) {
			throw new BadRequestException({
				code: 1002,
				message: 'This profile is already registered',
			});
		}

		dto.password = await bcrypt.hash(dto.password, 10);

		const verifyCode = generateVerifyCode();

		const user = new User();
		user.email = dto.email;
		user.password = dto.password;
		user.verifyCode = verifyCode;
		user.profile = existProfile;

		const newUser = await this.userRepository.create(user);

		await this.mailerService.sendMail({
			to: dto.email,
			subject: 'Verify code to register',
			template: './mail/register',
			context: {
				code: verifyCode,
			},
		});

		return newUser;
	}

	async verifyUser(dto: VerifyDto): Promise<TokenResponse> {
		const existUser = await this.userRepository.findByEmail(dto.email);

		if (!existUser) {
			throw new NotFoundException('User not found');
		}

		if (dto.code !== existUser.verifyCode) {
			throw new BadRequestException('Invalid verify code');
		}

		await this.userRepository.updateStatusUser(
			existUser.id,
			UserEnum.VERIFIED,
		);

		return await this.generateToken({
			email: dto.email,
		});
	}

	async resendVerifyCode(dto: ResendDto): Promise<void> {
		const existUser = await this.userRepository.findByEmail(dto.email);

		if (!existUser) {
			throw new NotFoundException('User not found');
		}

		const verifyCode = generateVerifyCode();

		await this.userRepository.updateVerifyCode(existUser.id, verifyCode);

		await this.mailerService.sendMail({
			to: dto.email,
			subject: 'Verify code to register',
			template: './mail/register',
			context: {
				code: verifyCode,
			},
		});

		return;
	}

	async loginUser(dto: LoginDto): Promise<TokenResponse> {
		const user = await this.userRepository.findByEmail(dto.email);

		if (!user) {
			throw new BadRequestException('Invalid Credential');
		}

		const isMatch = await bcrypt.compare(dto.password, user.password);
		if (!isMatch) {
			throw new UnauthorizedException({
				code: 1003,
				message: 'Invalid Credential',
			});
		}

		if (user.status == UserEnum.PENDING) {
			throw new UnauthorizedException({
				code: 1004,
				message: 'Your account is not verified',
			});
		}

		return await this.generateToken({
			email: user.email,
		});
	}

	private async generateToken({ email }): Promise<TokenResponse> {
		const accessToken = await this.jwtService.signAsync({ email });

		return {
			email,
			accessToken,
		};
	}
}
