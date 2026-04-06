import { Injectable, Logger } from '@nestjs/common';
import { TeamRepository } from './team.repository';
import { MembershipStatus, TeamRole, type User } from '@prisma/client';
import { CreateTeamDto, InviteUserDto } from './dto/create-team.dto';

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

	async inviteUser(dto: InviteUserDto, user: User) {
		const inviterMembership = await this.teamRepository.findTeamMemberByTeamIdAndUserId(dto.teamId, user.id);

		if (!inviterMembership) {
			throw new Error("not a team member.");
		}

		if (inviterMembership.role !== TeamRole.ADMIN && inviterMembership.role !== TeamRole.OWNER) {
			throw new Error("no permission.")
		}

		const existingMemberShip = await this.teamRepository.findTeamMemberByTeamIdAndUserId(dto.teamId, dto.userId);

		if (existingMemberShip) {
			throw new Error("already exist.")
		}

		const memberData = {
			role:	TeamRole.MEMBER,
			status:	MembershipStatus.INVITED,
			userId:	dto.userId,
			teamId:	dto.teamId,
		}

		return this.teamRepository.createMemberShip(memberData);
	}
}
