import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-tasks.dto';
import type { User } from '@prisma/client';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
	private readonly logger = new Logger(TasksService.name);

	constructor(private readonly tasksRepository: TasksRepository) {}

	async getAllTasks(user: User) {
		this.logger.log('getAllTasks が呼ばれました');
		return this.tasksRepository.findTasksByUserId(user.id);
	}

	async getTask(id: string) {
		return this.tasksRepository.findById(id);
	}

	async createTask(dto: CreateTaskDto, user: User) {
		const	taskData = {
			title:			dto.title,
			description:	dto.description,
			difficulty:		dto.difficulty,
			duration:		dto.duration,
			priority:		dto.priority,
			progress:		dto.progress,
			authorId: 		user.id,
			teamId: 		dto.teamId,
			dueDate:		dto.dueDate,
		};

		return this.tasksRepository.create(taskData);
	}

	async updateTask(id: string, dto: UpdateTaskDto, user: User) {
		this.logger.log(`updateTaskが呼ばれました: ${id} ${dto.progress}`);

		const task = await this.tasksRepository.findByIdAndAuthorId(id, user.id);

		if (!task) {
			throw new NotFoundException(`Task with ID "${id}" not found or you don't have permission`);
		}

		const updateData = {
			...dto,
		};

		return this.tasksRepository.update(id, updateData);
	}
}
