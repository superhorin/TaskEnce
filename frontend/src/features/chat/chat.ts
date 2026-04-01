import type { Message } from "../messages/message";
import type { Priority } from "../tasks/task";
import type { User } from "../users/user";

export type ThreadStatus = 'OPEN' | 'DONE';

export interface ChatThread {
	id:			string
	title:		string
	status:		ThreadStatus
	priority:	Priority

	members:	User[]
	messages:	Message[]

	createdAt:	string
	updatedAt:	string
}
