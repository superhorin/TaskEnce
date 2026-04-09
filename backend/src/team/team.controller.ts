import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { GetUser } from 'src/auth/get-user.decorator';
import type { User } from '@prisma/client';
import { CreateTeamDto, InviteUserDto } from './dto/create-team.dto';
import { CookieAuthGuard } from 'src/auth/cookie-auth.guard';
import { TokenAuthGuard } from 'src/auth/token-auth.guard';

@UseGuards(CookieAuthGuard)
@Controller('web-api/team')
export class WebTeamController {
	constructor(private readonly teamService: TeamService) {}

	@Get()
	getTeams(@GetUser() user: User) {
		return this.teamService.getAllTeams(user);
	}

	@Post()
	createTeam(@Body() dto: CreateTeamDto, @GetUser() user: User) {
		return this.teamService.create(dto, user);
	}

	@Post('invite')
	InviteUser(@Body() dto: InviteUserDto, @GetUser() user: User) {
		return this.teamService.inviteUser(dto, user);
	}
}

@UseGuards(TokenAuthGuard)
@Controller('v1/api/team')
export class ApiTeamController {
	constructor(private readonly teamService: TeamService) {}

	@Get()
	getTeams(@GetUser() user: User) {
		return this.teamService.getAllTeams(user);
	}

	@Post()
	createTeam(@Body() dto: CreateTeamDto, @GetUser() user: User) {
		return this.teamService.create(dto, user);
	}

	@Post('invite')
	InviteUser(@Body() dto: InviteUserDto, @GetUser() user: User) {
		return this.teamService.inviteUser(dto, user);
	}
}
