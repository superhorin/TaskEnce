import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { AuthRepository } from './auth.repository';
import { RedisService } from 'src/redis/redis.service';
import { v4 as uuidv4 } from 'uuid';
import { session } from 'passport';

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

		const { password, ...userWithoutPassword } = newUser;

		return userWithoutPassword;
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

		const { password, ...userWithoutPassword } = user;

		return userWithoutPassword;
	}

	async createSession(userId: string) {
		const sessionId = uuidv4();

		await this.redisService.set(`session:${sessionId}`, userId, 'EX', 86400);

		return sessionId;
	}

	async createToken(userId: string, userEmail: string) {
		const payload = { sub: userId, email: userEmail };

		return this.jwtService.sign(payload);
	}

	async deleteSession(sessionId: string) {
		await this.redisService.del(`session:${sessionId}`);
	}
}
