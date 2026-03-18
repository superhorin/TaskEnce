import type { AuthState } from "./auth";

const	initialState: AuthState = {
	user:		null,
	token:		localStorage.getItem("token") || null,
	loading:	false,
	error:		null,
}


