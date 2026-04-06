import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TeamService } from './team.service';
import { GetUser } from 'src/auth/get-user.decorator';
import type { User } from '@prisma/client';
import { CreateTeamDto, InviteUserDto } from './dto/create-team.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('team')
export class TeamController {
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
