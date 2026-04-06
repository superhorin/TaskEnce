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

		const newMembership = await this.teamRepository.createMembership(memberData);

		return {
			newTeam,
			teamMembership: newMembership,
		};
	}

	async inviteUser(dto: InviteUserDto, user: User) {
		const inviterMembership = await this.teamRepository.findMembershipByTeamIdAndUserId(dto.teamId, user.id);

		if (!inviterMembership) {
			throw new Error("not a team member.");
		}

		if (inviterMembership.role !== TeamRole.ADMIN && inviterMembership.role !== TeamRole.OWNER) {
			throw new Error("no permission.")
		}

		const existingMembership = await this.teamRepository.findMembershipByTeamIdAndUserId(dto.teamId, dto.userId);

		if (existingMembership) {
			if (existingMembership.status !== MembershipStatus.DECLINED)
				throw new Error("already exist.")

			const membershipData = {
				role:		TeamRole.MEMBER,
				status:		MembershipStatus.INVITED,
				userId:		dto.userId,
				inviterId:	user.id,
			}

			return this.teamRepository.updateInvitation(existingMembership.id, membershipData);
		}

		const membershipData = {
			role:		TeamRole.MEMBER,
			status:		MembershipStatus.INVITED,
			userId:		dto.userId,
			teamId:		dto.teamId,
			inviterId:	user.id,
		}

		return this.teamRepository.createMembership(membershipData);
	}

	async respondToInvitation(membershipId: string, action: 'accept' | 'deny', user: User) {
		const membership = await this.teamRepository.findMembershipById(membershipId);

		if (!membership || membership.status !== MembershipStatus.INVITED || membership.userId !== user.id) {
			throw new Error("no valid invitations");
		}

		if (action === 'accept') {
			const actionData = {
				status:	MembershipStatus.ACTIVE,
				joinAt:	new Date(),
			}
			return this.teamRepository.updateInvitation(membershipId, actionData);
		} else {
			const actionData = {
				status:	MembershipStatus.DECLINED,
			}
			return this.teamRepository.updateInvitation(membershipId, actionData);
		}
	}
}
