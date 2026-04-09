import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { RedisService } from "src/redis/redis.service";
import { AuthRepository } from "./auth.repository";
import { Request } from "express";

@Injectable()
export class CookieAuthGuard implements CanActivate {
	constructor(
		private readonly redisService: RedisService,
		private readonly authRepository: AuthRepository,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();

		const sessionId = request.cookies?.['session_id'];
		if (!sessionId) {
			throw new UnauthorizedException('no sessions.');
		}

		const userId = await this.redisService.get(`session:${sessionId}`);
		if (!userId) {
			throw new UnauthorizedException('no session with this user id.');
		}

		const user = await this.authRepository.find(userId);
		if (!user) {
			throw new UnauthorizedException('no users with this id.');
		}

		const { password, ...userWithoutPassword } = user;

		request['user'] = userWithoutPassword;

		return true;
	}
}
