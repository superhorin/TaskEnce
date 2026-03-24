import type { User } from "../users/user";

export interface AuthState {
	user:		User | null;
	token:		string | null;
	loading:	boolean;
	error:		string | null;
}
