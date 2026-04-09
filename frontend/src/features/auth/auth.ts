import type { User } from "../users/user";

export interface AuthState {
	user:		User | null;
	loading:	boolean;
	error:		string | null;
}
