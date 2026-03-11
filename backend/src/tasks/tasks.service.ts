import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-tasks.dto';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';

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

	async createTask(dto: CreateTaskDto) {
		let	defaultUser = await this.prisma.user.findFirst();

		if (!defaultUser) {
			defaultUser = await this.prisma.user.create({
				data: {
					name:		'Guest User',
					email:		'guest@example.com',
					password:	'xxxxxxxxxxxx',
				},
			});
			this.logger.log(`created dummy user: ${defaultUser}`);
		}

		return this.prisma.task.create({
			data: {
				title:			dto.title,
				description:	dto.description,
				difficulty:		dto.difficulty,
				duration:		dto.duration,
				priority:		dto.priority,
				progress:		dto.progress,
				authorId: 		defaultUser.id,
				teamId: 		dto.teamId,
				dueDate:		dto.dueDate,
			},
			include: {
				author: true,
				team: true,
			}
		})
	}

	async updateTask(id: string, dto: UpdateTaskDto) {
		this.logger.log(`updateTaskが呼ばれました: ${id} ${dto.progress}`);
		try {
			const updateTask = await this.prisma.task.update({
				where: {id: id},
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
