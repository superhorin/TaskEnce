import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { title } from 'process';

@Controller('tasks')
export class TasksController {
	constructor(private readonly taskService: TasksService) {}

	@Get()
	getTasks() {
		return this.taskService.getAllTasks();
	}

	@Post()
	createTask(@Body('title') title: string) {
		return this.taskService.createTask(title);
	}
}
