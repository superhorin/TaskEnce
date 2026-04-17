import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { AuthRepository } from './auth.repository';
import { RedisService } from 'src/redis/redis.service';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
	// private readonly logger = new Logger(AuthService.name);
	public readonly sessionTtl: number;
	public readonly tokenTtl: number;
	constructor(
		private readonly jwtService: JwtService,
		private readonly authRepository: AuthRepository,
		private readonly redisService: RedisService,
		private readonly configService: ConfigService,
	) {
		this.sessionTtl = this.configService.get<number>('auth.sessionTtl', 7 * 24 * 60 * 60);
		this.tokenTtl = this.configService.get<number>('auth.tokenTtl', 30 * 24 * 60 * 60);
	}

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

		await this.redisService.set(`session:${sessionId}`, userId, 'EX', this.sessionTtl);

		return sessionId;
	}

	async refreshSession(sessionId: string) {
		await this.redisService.expire(`session:${sessionId}`, this.sessionTtl);
	}

	async deleteSession(sessionId: string) {
		await this.redisService.del(`session:${sessionId}`);
	}

	async createTokens(userId: string, userEmail: string) {
		const payload = { sub: userId, email: userEmail };

		const accessToken = this.jwtService.sign(payload, { expiresIn: '15m', });
		const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d', });

		await this.redisService.set(`refresh_token:${userId}`, refreshToken, 'EX', this.tokenTtl);

		return { accessToken, refreshToken };
	}

	async deleteToken(userId: string) {
		await this.redisService.del(`refresh_token:${userId}`);
	}

	async refreshTokens(incomingRefreshToken: string) {
		try {
			const payload = this.jwtService.verify(incomingRefreshToken);
			const userId = payload.sub;

			const storedToken = await this.redisService.get(`refresh_token:${userId}`);

			if (!storedToken || storedToken !== incomingRefreshToken) {
				throw new UnauthorizedException('invalid refresh token.');
			}

			const user = await this.authRepository.find(userId);
			if (!user) {
				throw new UnauthorizedException('user does not exit.');
			}

			return await this.createTokens(user.id, user.email);
		} catch(e) {
			throw new UnauthorizedException('Please login again.');
		}
	}
}
