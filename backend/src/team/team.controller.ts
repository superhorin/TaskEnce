import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TeamService } from './team.service';
import { GetUser } from 'src/auth/get-user.decorator';
import type { User } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('team')
export class TeamController {
	constructor(private readonly teamService: TeamService) {}

	@Get()
	getTeams(@GetUser() user: User) {
		return this.teamService.getAllTeams(user);
	}
}
