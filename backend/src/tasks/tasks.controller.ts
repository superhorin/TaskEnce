import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-tasks.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import type { User } from '@prisma/client';
import { CookieAuthGuard } from 'src/auth/cookie-auth.guard';
import { TokenAuthGuard } from 'src/auth/token-auth.guard';

@UseGuards(CookieAuthGuard)
@Controller('web-api/tasks')
export class WebTasksController {
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

@UseGuards(TokenAuthGuard)
@Controller('v1/api/tasks')
export class ApiTasksController {
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
