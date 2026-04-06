import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Team, Membership, User } from "@prisma/client";

@Injectable()
export class TeamRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findTeamsByUserId(userId: string): Promise<Membership[]> {
		return this.prisma.membership.findMany({
			where: {
				userId: userId,
			},
			include: {
				team: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		})
	}

	async create(data: any): Promise<Team> {
		return this.prisma.team.create({
			data: data,
		});
	}

	async createMembership(data: any): Promise<Membership> {
		return this.prisma.membership.create({
			data: data,
		});
	}

	async findMembershipByTeamIdAndUserId(teamId: string, userId: string): Promise<Membership | null> {
		return this.prisma.membership.findUnique({
			where: {
				userId_teamId: {
					userId: userId,
					teamId: teamId,
				},
			},
		});
	}

	async findMembershipById(membershipId: string): Promise<Membership | null> {
		return this.prisma.membership.findUnique({
			where: {
				id: membershipId,
			},
		});
	}

	async updateInvitation(membershipId: string, data: any): Promise<Membership> {
		return this.prisma.membership.update({
			where: {
				id: membershipId,
			},
			data: data,
		});
	}
}
