import type { Task } from "../tasks/task";
import type { Membership } from "./membership";
import type { ChatThread } from "../chatThread/chatThread";

export interface Team {
	id:		string;
	name:	string;

	iconUrl?:	string;

	level:	number;
	exp:	number;

	tasks:			Task[];
	members:		Membership[];
	chatThreads:	ChatThread[];
}
