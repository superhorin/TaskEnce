import type { Task } from "../tasks/task";
import type { Member } from "./member";

export interface Team {
	id:		string;
	name:	string;

	level:	number;
	exp:	number;

	tasks:		Task[];
	members:	Member[];
}
