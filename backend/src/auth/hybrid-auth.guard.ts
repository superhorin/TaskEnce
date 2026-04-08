import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RedisService } from "src/redis/redis.service";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class HybridAuthGuard implements CanActivate {
	private readonly logger = new Logger(HybridAuthGuard.name);
	constructor(
		private readonly jwtService: JwtService,
		private readonly redisService: RedisService,
		private readonly authRepository: AuthRepository,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();

		const authHeader = request.headers.authorization;
		if (authHeader && authHeader.startsWith('Bearer ')) {
			const token = authHeader.split(' ')[1];
			return this.validateJwt(token, request);
		}

		const sessionId = request.cookies?.['session_id'];
		if (sessionId) {
			this.logger.debug("from session id!!!!!!");
			return this.validateSession(sessionId, request);
		}

		throw new UnauthorizedException('no sessions and no tokens');
	}

	private async validateJwt(token: string, request: any): Promise<boolean> {
		try {
			const payload = this.jwtService.verify(token);

			const user = await this.authRepository.find(payload.sub);

			if (!user) {
				throw new UnauthorizedException('no users with this token.');
			}

			request.user = user;

			return true;
		} catch (error) {
			throw new UnauthorizedException('invalid token.');
		}
	}

	private async validateSession(sessionId: string, request: any): Promise<boolean> {
		const userId = await this.redisService.get(`session:${sessionId}`);

		if (!userId) {
			throw new UnauthorizedException('invalid session id.');
		}

		const user = await this.authRepository.find(userId);

		if (!user) {
			throw new UnauthorizedException('no users with this session.');
		}

		request.user = user;
		return true;
	}
}
