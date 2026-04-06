import type { User } from "../users/user";
import type { Team } from "./team";

export type TeamRole = 'OWNER' | 'ADMIN' | 'MEMBER' | 'GUEST';
export type MembershipStatus = 'INVITED' | 'ACTIVE' | 'BLOCKED' | 'DECLINED';

export interface Member {
	id:			string;
	role:		TeamRole;
	status:		MembershipStatus;

	nickname:	string;
	position:	string;
	inMuted:	boolean;

	teamExp:	number;
	teamLevel:	number;

	user:		User;
	team:		Team;

	createdAt:	string;
	joinedAt:	string;
	updatedAt:	string;
}
