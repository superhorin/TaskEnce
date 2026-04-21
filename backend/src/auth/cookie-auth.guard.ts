import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { RedisService } from "src/redis/redis.service";
import { AuthRepository } from "./auth.repository";
import { Request } from "express";
import { AuthService } from "./auth.service";

@Injectable()
export class CookieAuthGuard implements CanActivate {
	constructor(
		private readonly redisService: RedisService,
		private readonly authRepository: AuthRepository,
		private readonly authService: AuthService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();

		console.log('受け取ったヘッダー:', request.headers.cookie);
   		console.log('パースされたCookie:', request.cookies);

		const sessionId = request.cookies?.['session_id'];
		if (!sessionId) {
			throw new UnauthorizedException('no sessions!!.');
		}

		const userId = await this.redisService.get(`session:${sessionId}`);
		if (!userId) {
			throw new UnauthorizedException('no session with this user id.');
		}

		await this.authService.refreshSession(sessionId);

		const user = await this.authRepository.find(userId);
		if (!user) {
			throw new UnauthorizedException('no users with this id.');
		}

		const { password, ...userWithoutPassword } = user;

		request['user'] = userWithoutPassword;

		return true;
	}
}
