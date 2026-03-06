import type { Task } from "../tasks/task";
import type { User } from "../users/user";

export interface Team {
	id:		string;
	name:	string;

	level:	number;
	exp:	number;

	tasks?:	Task[];
	users?:	User[];
}