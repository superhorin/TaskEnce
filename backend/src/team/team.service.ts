import { Injectable, Logger } from '@nestjs/common';
import { TeamRepository } from './team.repository';
import { MembershipStatus, TeamRole, type User } from '@prisma/client';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamService {
	private readonly logger = new Logger(TeamService.name);

	constructor(private readonly teamRepository: TeamRepository) {}

	async getAllTeams(user: User) {
		return this.teamRepository.findTeamsByUserId(user.id);
	}

	async create(dto: CreateTeamDto, user: User) {
		const newTeam = await this.teamRepository.create(dto);

		const memberData = {
			role:	TeamRole.OWNER,
			status:	MembershipStatus.ACTIVE,
			userId:	user.id,
			teamId:	newTeam.id,
		};

		const newMemberShip = await this.teamRepository.createMemberShip(memberData);

		return {
			newTeam,
			teamMembership: newMemberShip,
		};
	}
}
