import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { GetUser } from './get-user.decorator';
import type { User } from '@prisma/client';
import type { Response } from 'express';
import { CookieAuthGuard } from './cookie-auth.guard';
import { TokenAuthGuard } from './token-auth.guard';
import type { Request } from "express";

@Controller('web-api/auth')
export class WebAuthController {
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
		const user = await this.authService.register(dto);

		const sessionId = await this.authService.createSession(user.id);
		this.setSessionCookie(res, sessionId);

		return { user: user };
	}

	@Post('login')
	async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
		const user = await this.authService.login(dto);

		const sessionId = await this.authService.createSession(user.id);
		this.setSessionCookie(res, sessionId);

		return { user: user };
	}

	@UseGuards(CookieAuthGuard)
	@Post('logout')
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const sessionId = req.cookies?.['session_id'];
		if (sessionId) {
			await this.authService.deleteSession(sessionId);
		}

		res.clearCookie('session_id', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
		});

		return { message: 'logout!' };
	}

	@UseGuards(CookieAuthGuard)
	@Get('me')
	getProfile(@GetUser() user: User) {
		return user;
	}
}

@Controller('v1/api/auth')
export class ApiAuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Body() dto: RegisterDto) {
		const user = await this.authService.register(dto);

		const accessToken = await this.authService.createToken(user.id, user.email);

		return { accessToken, user };
	}

	@Post('login')
	async login(@Body() dto: LoginDto) {
		const user = await this.authService.login(dto);

		const accessToken = await this.authService.createToken(user.id, user.email);

		return { accessToken, user };
	}

	@UseGuards(TokenAuthGuard)
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout() {
		return { message: 'logout!' };
	}

	@UseGuards(TokenAuthGuard)
	@Get('me')
	getProfile(@GetUser() user: User) {
		return user;
	}
}
