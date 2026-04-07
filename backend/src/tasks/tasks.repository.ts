import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, Task } from "@prisma/client";

const taskWithThreadDetailInclude = {
	author: true,
	assignee: true,
	actions: {
		orderBy: { createdAt: 'asc' as const },
		include: { actor: true, passedTo: true },
	},
	chatThread: {
		include: {
			messages: {
				orderBy: { createdAt: 'asc' as const },
				include: { sender: true },
			},
			tasks: {
				include: {
					author: true,
					assignee: true,
					actions: {
						orderBy: { createdAt: 'asc' as const },
						include: { actor: true, passedTo: true },
					},
				},
			},
		},
	},
} satisfies Prisma.TaskInclude;

export type TaskWithThreadDetails = Prisma.TaskGetPayload<{
	include: typeof taskWithThreadDetailInclude;
}>;

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

	async	findById(id: string): Promise<TaskWithThreadDetails | null> {
		return this.prisma.task.findUnique({
			where: { id: id },
			include: {
				author: true,
				assignee: true,
				actions: {
					orderBy: { createdAt: 'asc' },
					include: { actor: true, passedTo: true },
				},
				chatThread: {
					include: {
						messages: {
							orderBy: { createdAt: 'asc' },
							include: { sender: true },
						},
						tasks: {
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
				}
			}
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
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new Error('RecordNotFound');
			}
			throw error;
		}
	}
}
