export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface User {
	id:   string;
	name: string;
}

export interface Task {
	id:           string;
	title:        string;
	description?: string;
	priority:     Priority;
	status:       Status;

	author:      User;
	assignee?:    User;
	achiever?:    User;

	createdAt:    string;
	updatedAt:    string;
	achievedAt?:  string;
}
