import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./auth";
import api from '@/lib/api';

const	initialState: AuthState = {
	user:		null,
	token:		localStorage.getItem("token") || null,
	loading:	false,
	error:		null,
}

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async (credentials: { email: string; password: string }, {rejectWithValue}) => {
		try {
			const res = await api.post('/auth/login', credentials);

			localStorage.setItem('token', res.data.accessToken);

			return res.data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'failed at login');
		}
	}
);

export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async(credentials: {email: string, password: string, name: string}, { rejectWithValue }) => {
		try {
			const res = await api.post('/auth/register', credentials);

			localStorage.setItem('token', res.data.accessToken);

			return res.data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'failed at register');
		}
	}
)

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
			state.token = null;
			localStorage.removeItem('token');
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.token = action.payload.accessToken;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.token = action.payload.accessToken;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
