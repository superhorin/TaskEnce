import { BadGatewayException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService,
	) {}

	async register(dto: RegisterDto) {
		const existingUser = await this.prisma.user.findUnique({
			where: { email: dto.email },
		});

		if (existingUser) {
			throw new ConflictException('this email user already exists');
		}

		const hashedPassword = await bcrypt.hash(dto.password, 10);

		const newUser = await this.prisma.user.create({
			data: {
				name: dto.name,
				email: dto.email,
				password: hashedPassword,
			},
		});

		const { password, ...userWithoutPassword } = newUser;
		const payload = { sub: newUser.id, email: newUser.email };
		return {
			user: userWithoutPassword,
			accessToken: this.jwtService.sign(payload),
		};
	}

	async login(dto: LoginDto) {
		const user = await this.prisma.user.findUnique({
			where: {email: dto.email },
		});

		if (!user) {
			throw new UnauthorizedException('mail address or password is wrong.');
		}

		const isPasswordValid = await bcrypt.compare(dto.password, user.password);

		if (!isPasswordValid) {
			throw new UnauthorizedException('mail address or password is wrong.');
		}

		const payload = { sub: user.id, email: user.email };

		const { password, ...userWithoutPassword } = user;

		return {
			user: userWithoutPassword,
			accessToken: this.jwtService.sign(payload),
		}
	}
}
