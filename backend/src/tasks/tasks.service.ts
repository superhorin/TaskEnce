import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
	private readonly logger = new Logger(TasksService.name);

	constructor(private prisma: PrismaService) {}

	async getAllTasks() {
		this.logger.log('getAllTasks が呼ばれました');
		return this.prisma.task.findMany({
			orderBy: { createdAt: 'desc' },
			include: { author: true }
		});
	}

	async createTask(title: string) {
		let	defaultUser = await this.prisma.user.findFirst();

		if (!defaultUser) {
			defaultUser = await this.prisma.user.create({
				data: {
					name: 'Guest User',
					email: 'guest@example.com',
				},
			});
			this.logger.log(`created dummy user: ${defaultUser}`);
		}

		return this.prisma.task.create({
			data: {
				title: title,
				authorId: defaultUser.id,
			},
			include: { author: true }
		})
	}
}
