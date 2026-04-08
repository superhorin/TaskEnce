import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { GetUser } from './get-user.decorator';
import type { User } from '@prisma/client';
import type { Response } from 'express';
import { HybridAuthGuard } from './hybrid-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	private setSessionCookie(res: Response, sessionId: string) {
		res.cookie('session_id', sessionId, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 86400 * 1000,
		});
	}

	@Post('register')
	async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
		const { accessToken, sessionId, newUser } = await this.authService.register(dto);

		this.setSessionCookie(res, sessionId);

		return { accessToken, newUser };
	}

	@Post('login')
	async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
		const { accessToken, sessionId, user } = await this.authService.login(dto);

		this.setSessionCookie(res, sessionId);

		return { accessToken, user };
	}

	@UseGuards(HybridAuthGuard)
	@Get('me')
	getProfile(@GetUser() user: User) {
		return user;
	}
}
