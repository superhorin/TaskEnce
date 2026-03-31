import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);
	constructor(
		private readonly jwtService: JwtService,
		private readonly authRepository: AuthRepository,
	) {}

	async register(dto: RegisterDto) {
		const existingUser = await this.authRepository.findByEmail(dto.email);

		if (existingUser) {
			throw new ConflictException('this email user already exists');
		}

		const	hashedPassword = await bcrypt.hash(dto.password, 10);

		const	userData = {
			name: dto.name,
			email: dto.email,
			password: hashedPassword,
		};

		const newUser = await this.authRepository.create(userData);

		const { password, ...userWithoutPassword } = newUser;
		const payload = { sub: newUser.id, email: newUser.email };
		return {
			user: userWithoutPassword,
			accessToken: this.jwtService.sign(payload),
		};
	}

	async login(dto: LoginDto) {
		const user = await this.authRepository.findByEmail(dto.email);

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
