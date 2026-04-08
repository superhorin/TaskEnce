import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { AuthRepository } from './auth.repository';
import { RedisService } from 'src/redis/redis.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);
	constructor(
		private readonly jwtService: JwtService,
		private readonly authRepository: AuthRepository,
		private readonly redisService: RedisService,
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

		const payload = { sub: newUser.id, email: newUser.email };

		const accessToken = this.jwtService.sign(payload);

		const sessionId = uuidv4();

		await this.redisService.set(`session:${sessionId}`, newUser.id, 'EX', 86400);

		return {
			accessToken,
			sessionId,
			newUser,
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

		const sessionId = uuidv4();

		await this.redisService.set(`session:${sessionId}`, user.id, 'EX', 86400);

		const payload = { sub: user.id, email: user.email };

		const accessToken = this.jwtService.sign(payload);

		return {
			accessToken,
			sessionId,
			user,
		};
	}
}
