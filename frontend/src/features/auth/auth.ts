import type { User } from "../users/user";

export interface AuthState {
	user:			User | null;
	isCheckingAuth:	boolean;
	loading:		boolean;
	error:			string | null;
}
