import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-tasks.dto';
import type { User } from '@prisma/client';

@Injectable()
export class TasksService {
	private readonly logger = new Logger(TasksService.name);

	constructor(private prisma: PrismaService) {}

	async getAllTasks(user: User) {
		this.logger.log('getAllTasks が呼ばれました');
		return this.prisma.task.findMany({
			where: {
				OR: [
					{ authorId: user.id },
					{ assigneeId: user.id },
					{ achieverId: user.id },
				],
			},
			orderBy: { createdAt: 'desc' },
			include: { author: true }
		});
	}

	async createTask(dto: CreateTaskDto, user: User) {
		return this.prisma.task.create({
			data: {
				title:			dto.title,
				description:	dto.description,
				difficulty:		dto.difficulty,
				duration:		dto.duration,
				priority:		dto.priority,
				progress:		dto.progress,
				authorId: 		user.id,
				teamId: 		dto.teamId,
				dueDate:		dto.dueDate,
			},
			include: {
				author: true,
				team: true,
			}
		})
	}

	async updateTask(id: string, dto: UpdateTaskDto, user: User) {
		this.logger.log(`updateTaskが呼ばれました: ${id} ${dto.progress}`);

		const task = await this.prisma.task.findFirst({
			where: {
				id: id,
				authorId: user.id,
			},
		});

		if (!task) {
			throw new NotFoundException(`Task with ID "${id}" not found`);
		}

		try {
			const updateTask = await this.prisma.task.update({
				where: {
					id: id,
				},
				data: {
					...dto,
				},
			});
			return updateTask;
		} catch (error) {
			if (error.code === 'P2025') {
				throw new NotFoundException(`Task with ID "${id}" not found`);
			}
			throw error;
		}
	}
}
