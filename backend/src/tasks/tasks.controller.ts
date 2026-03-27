import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-tasks.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
	constructor(private readonly taskService: TasksService) {}

	@Get()
	getTasks() {
		return this.taskService.getAllTasks();
	}

	@Post()
	createTask(@Body() dto: CreateTaskDto) {
		return this.taskService.createTask(dto);
	}

	@Patch(':id')
	updateTask(
		@Param('id') id: string,
		@Body() dto: UpdateTaskDto
	) {
		return this.taskService.updateTask(id, dto);
	}
}
