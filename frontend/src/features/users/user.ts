import type { Task } from "../tasks/task";
import type { Team } from "../teams/team";

export interface User {
	id:			string;
	name:		string;
	email:		string;
	password?:	string;

	level:	number;
	exp:	number;

	createdTasks?:	Task[];
	assignedTasks?:	Task[];
	achievedTasks?:	Task[];

	teams?:	Team[];

	createdAt:	string;
}
