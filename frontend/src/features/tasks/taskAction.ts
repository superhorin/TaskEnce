import type { User } from "../users/user";
import type { Task } from "./task";

export type ActionType = 'CREATED' | 'PROGRESSED' | 'PASSED' | 'COMPLETED' | 'CANCELED';

export interface TaskAction {
	id:			string;
	task:		Task;
	actor:		User;
	actionType:	ActionType;
	message?:	string;
	passedTo?:	User;
	createdAt:	string;
}
