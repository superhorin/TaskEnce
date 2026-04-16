import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CookieAuthGuard } from 'src/auth/cookie-auth.guard';
import { ThreadService } from './thread.service';
import { TokenAuthGuard } from 'src/auth/token-auth.guard';

@UseGuards(CookieAuthGuard)
@Controller('web-api/thread')
export class WebThreadController {
	constructor(private readonly threadService: ThreadService) {}

	@Get(':id')
	getThread(@Param('id') id: string) {
		return this.threadService.getThread(id);
	}
}

@UseGuards(TokenAuthGuard)
@Controller('v1/api/tasks')
export class ApiThreadController {
	constructor(private readonly threadService: ThreadService) {}

	@Get(':id')
	getThread(@Param('id') id: string) {
		return this.threadService.getThread(id);
	}
}
