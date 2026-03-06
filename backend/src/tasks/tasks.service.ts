import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
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
					name: 'Guest User',
					email: 'guest@example.com',
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
			},
			include: {
				author: true,
				team: true,
			}
		})
	}
}
