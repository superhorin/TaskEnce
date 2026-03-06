import type { User } from "../users/user";
import type { Team } from "../teams/team";

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

	author:		User;
	assignee?:	User[];
	achiever?:	User[];

	team?:	Team[];

	createdAt:    	string;
	updatedAt:    	string;
	achievedAt?: 	string;
	dueDate?:		string;
}
