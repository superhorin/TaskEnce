import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
	private readonly logger = new Logger(TasksService.name)
	constructor(private prisma: PrismaService) {}

	async getAllTasks() {

		this.logger.log('getAllTasks が呼ばれました');

		return this.prisma.task.findMany({
			orderBy: { createdAt: 'desc' },
		});
	}

	async createTask(title: string) {
		return this.prisma.task.create({
			data: {title},
		})
	}

	getHi(): string {
		return 'Hi';
	}
}
