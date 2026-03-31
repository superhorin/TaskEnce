import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, Task } from "@prisma/client";

@Injectable()
export class TasksRepository {
	constructor(private readonly prisma: PrismaService) {}

	async	findTasksByUserId(userId: string): Promise<Task[]> {
		return this.prisma.task.findMany({
			where: {
				OR: [
					{ authorId: userId },
					{ assigneeId: userId },
				],
			},
			orderBy: { createdAt: 'desc' },
			include: { author: true },
		});
	}

	async	findByIdAndAuthorId(id: string, authorId: string): Promise<Task | null> {
		return this.prisma.task.findFirst({
			where: {
				id: id,
				authorId: authorId,
			},
		});
	}

	async	create(data: any): Promise<Task> {
		return this.prisma.task.create({
			data: data,
			include: {
				author: true,
				team: true,
			},
		});
	}

	async	update(id: string, data: Prisma.TaskUpdateInput): Promise<Task> {
		try {
			return await this.prisma.task.update({
				where: { id: id },
				data: data,
			});
		} catch(error) {
			if (error.code === 'P2025') {
				throw new Error('RecordNotFound');
			}
			throw error;
		}
	}
}
