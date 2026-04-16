import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ThreadRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findById(id: string) {
		return this.prisma.chatThread.findUnique({
			where: {id: id},
			include: {
				messages: {
					orderBy: {createdAt: 'asc'},
					include: {sender: true},
				},
				tasks: {
					orderBy: {createdAt: 'asc'},
					include: {
						author: true,
						assignee: true,
						actions: {
							orderBy: { createdAt: 'asc' },
							include: { actor: true, passedTo: true },
						}
					}
				}
			}
		});
	}
}
