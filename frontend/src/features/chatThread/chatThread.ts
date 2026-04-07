import type { Message } from "../messages/message";
import type { Priority } from "../tasks/task";
import type { User } from "../users/user";
import type { Task } from "../tasks/task";

export type ThreadStatus = 'OPEN' | 'DONE';

export interface ChatThread {
	id:			string;
	title:		string;
	status:		ThreadStatus;
	priority:	Priority;

	members:	User[];
	messages:	Message[];

	tasks:		Task[];

	createdAt:	string;
	updatedAt:	string;
}
