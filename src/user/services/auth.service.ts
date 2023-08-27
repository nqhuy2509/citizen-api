import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto, VerifyDto } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { generateVerifyCode } from '../../utils';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';
import { StatusUser } from '../../enums/statusUser';

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
	) {}

	async registerUser(dto: RegisterDto): Promise<User> {
		const existUser = await this.userRepository.findUnique(
			dto.email,
			dto.citizenId,
		);

		if (existUser) {
			throw new BadRequestException('User already exists');
		}

		dto.password = await bcrypt.hash(dto.password, 10);

		const verifyCode = generateVerifyCode();

		await this.mailerService.sendMail({
			to: dto.email,
			subject: 'Verify code to register',
			template: './mail/register',
			context: {
				code: verifyCode,
			},
		});

		const user = new User();
		user.email = dto.email;
		user.password = dto.password;
		user.verifyCode = verifyCode;

		return await this.userRepository.create(user);
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
			StatusUser.VERIFIED,
		);

		return await this.generateToken({
			email: dto.email,
		});
	}

	async loginUser(dto: LoginDto): Promise<TokenResponse> {
		const user = await this.userRepository.findByEmail(dto.email);

		if (!user) {
			throw new BadRequestException('Invalid Credential');
		}

		const isMatch = await bcrypt.compare(dto.password, user.password);
		if (!isMatch) {
			throw new BadRequestException('Invalid Credential');
		}

		if (user.status == StatusUser.PENDING) {
			throw new UnauthorizedException("User hasn't been verified yet");
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
