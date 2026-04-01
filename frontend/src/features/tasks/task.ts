import type { User } from "../users/user";
import type { Team } from "../teams/team";
import type { Message } from "../messages/message";

export type Difficulty = 'TRIVIAL' | 'SIMPLE' | 'CHALLENGING' | 'HARD' | 'EPIC';
export type Duration = 'BURST' | 'QUICK' | 'STANDARD' | 'LONG' | 'MARATHON';
export type Priority = 'MINOR' | 'NORMAL' | 'IMPORTANT' | 'MAJOR' | 'CRITICAL';

export interface Task {
	id:           string;
	title:        string;
	description?: string;

	difficulty:	Difficulty;
	duration:	Duration;
	priority:	Priority;

	progress:	number;

	author:			User;
	assignee?:		User[];
	contributors?:	User[];

	parentTask?:	Task[]
	subTasks?:		Task[]

	messages?:		Message[]

	sourceMessage?:	Message

	teams?:	Team[];

	createdAt:    	string;
	updatedAt:    	string;
	achievedAt?: 	string;
	dueDate?:		string;

	relatedThreadMessages?:	Message[]
}
