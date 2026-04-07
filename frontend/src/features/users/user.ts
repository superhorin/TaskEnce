import type { ChatThread } from "../chatThread/chatThread";
import type { Task } from "../tasks/task";
import type { Membership } from "../teams/membership";
import type { Message } from "../messages/message";
import type { TaskAction } from "../tasks/taskAction";

export interface User {
	id:			string;
	name:		string;
	email:		string;
	password?:	string;
	iconUrl?:	string;

	level:	number;
	exp:	number;

	createdTasks?:	Task[];
	assignedTasks?:	Task[];
	achievedTasks?:	Task[];

	memberships:	Membership[];
	invitedMembers:	Membership[];

	chatThreads:	ChatThread[];
	messages:		Message[];

	actionPerformed:	TaskAction[];
	actionReceived:		TaskAction[];

	createdAt:		string;
	lactActiveAt:	string;
}
