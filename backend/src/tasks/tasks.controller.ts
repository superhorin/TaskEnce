import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-tasks.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import type { User } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
	constructor(private readonly taskService: TasksService) {}

	@Get()
	getTasks(@GetUser() user: User) {
		return this.taskService.getAllTasks(user);
	}

	@Get(':id')
	getTask(@Param('id') id: string) {
		return this.taskService.getTask(id);
	} 

	@Post()
	createTask(@Body() dto: CreateTaskDto, @GetUser() user: User) {
		return this.taskService.createTask(dto, user);
	}

	@Patch(':id')
	updateTask(
		@Param('id') id: string,
		@Body() dto: UpdateTaskDto,
		@GetUser() user: User,
	) {
		return this.taskService.updateTask(id, dto, user);
	}
}
