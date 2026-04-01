import type { ChatThread } from "../chat/chat"
import type { Task } from "../tasks/task"
import type { User } from "../users/user"

export interface Message {
	id:		string
	text:	string

	sender:		User
	thread?:	ChatThread
	task?:		Task

	derivedTasks?:	Task[]

	createdAt:		string
}
