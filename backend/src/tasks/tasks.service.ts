import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
	constructor(private prisma: PrismaService) {}

	async getAllTasks() {
		return this.prisma.task.findMany({
			orderBy: { createdAt: 'desc' },
		});
	}

	async createTask(title: string) {
		return this.prisma.task.create({
			data: {title},
		})
	}
}
