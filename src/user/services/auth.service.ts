import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto, VerifyDto } from '../dto/auth.dto';
import { PrismaClient, StatusUser, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { generateVerifyCode } from '../../utils';
import { MailerService } from '@nestjs-modules/mailer';

const prisma = new PrismaClient();

type TokenResponse = {
	email: string;
	identifierId: string;
	accessToken: string;
};

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly mailerService: MailerService,
	) {}

	async registerUser(dto: RegisterDto): Promise<User> {
		const existUser = await prisma.user.findFirst({
			where: {
				OR: [
					{ email: dto.email },
					{ username: dto.username },
					{ identifierID: dto.identifierId },
				],
			},
		});

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

		return prisma.user.create({
			data: {
				email: dto.email,
				password: dto.password,
				username: dto.username,
				verifiyCode: verifyCode,
			},
		});
	}

	async verifyUser(dto: VerifyDto): Promise<TokenResponse> {
		const existUser = await prisma.user.findUnique({
			where: { email: dto.email },
		});

		if (!existUser) {
			throw new NotFoundException('User not found');
		}

		if (dto.code !== existUser.verifiyCode) {
			throw new BadRequestException('Invalid verify code');
		}

		await prisma.user.update({
			where: { email: dto.email },
			data: { status: StatusUser.ACTIVE },
		});

		return await this.generateToken({
			email: dto.email,
			identifierId: existUser.identifierID,
		});
	}

	async loginUser(dto: LoginDto): Promise<TokenResponse> {
		const user = await prisma.user.findFirst({
			where: {
				OR: [
					{
						email: dto.email,
					},
					{
						username: dto.email,
					},
				],
			},
		});

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
			identifierId: user.identifierID,
		});
	}

	private async generateToken({
		email,
		identifierId,
	}): Promise<TokenResponse> {
		const accessToken = await this.jwtService.signAsync({ email });

		return {
			email,
			identifierId,
			accessToken,
		};
	}
}
