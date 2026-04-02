import { Injectable, Logger } from '@nestjs/common';
import { TeamRepository } from './team.repository';
import type { User } from '@prisma/client';

@Injectable()
export class TeamService {
	private readonly logger = new Logger(TeamService.name);

	constructor(private readonly teamRepository: TeamRepository) {}

	async getAllTeams(user: User) {
		return this.teamRepository.findTeamsByUserId(user.id);
	}
}
