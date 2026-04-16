import { Injectable } from '@nestjs/common';
import { ThreadRepository } from './thread.repository';

@Injectable()
export class ThreadService {
	constructor(private readonly threadRepository: ThreadRepository) {}

	async getThread(id: string) {
		const thread = await this.threadRepository.findById(id);

		if (!thread) {
			throw new Error("Thread not found");
		}

		return thread;
	}
}
