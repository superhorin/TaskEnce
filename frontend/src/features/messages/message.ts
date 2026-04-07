import type { ChatThread } from "../chatThread/chatThread"
import type { Priority } from "../tasks/task"
import type { User } from "../users/user"

export interface Message {
	id:		string;
	text:	string;

	priotiry:	Priority;

	sender:			User;
	cahtThread?:	ChatThread;

	createdAt:		string;
}
