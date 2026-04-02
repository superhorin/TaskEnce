import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Team, TeamMember } from "@prisma/client";

@Injectable()
export class TeamRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findTeamsByUserId(userId: string): Promise<TeamMember[]> {
		return this.prisma.teamMember.findMany({
			where: { userId: userId },
			include: { team: true },
			orderBy: { createdAt: 'asc' },
		})
	}
}
