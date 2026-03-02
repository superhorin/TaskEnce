export interface CreateTaskRequest {
	title:			string;
	description?:	string;
	priority?:		'LOW' | 'MEDIUM' | 'HIGH'; 
	assigneeId?:	string;
	teamId?:		string;
}
