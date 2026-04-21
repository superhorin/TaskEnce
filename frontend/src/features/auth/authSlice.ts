import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./auth";
import api from '@/lib/api';
import axios from "axios";

const	initialState: AuthState = {
	user:			null,
	isCheckingAuth:	true,
	loading:		false,
	error:			null,
}

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async (credentials: { email: string; password: string }, {rejectWithValue}) => {
		try {
			const res = await api.post('/auth/login', credentials);

			return res.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data?.message || 'failed at login');
			}
			return rejectWithValue('An unexpected error occurred at login.');
		}
	}
);

export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async(credentials: {email: string, password: string, name: string}, { rejectWithValue }) => {
		try {
			const res = await api.post('/auth/register', credentials);

			return res.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data?.message || 'failed at register');
			}
			return rejectWithValue('An unexpected error occurred at register.');
		}
	}
);

export const fetchCurrentUser = createAsyncThunk(
	'auth/fetchCurrentUser',
	async(_, { rejectWithValue }) => {
		try {
			const res = await api.get('/auth/me');
			return res.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data?.message || 'failed to fetch profile');
			}
			return rejectWithValue('An unexpected error occurred at fetching current user.');
		}
	}
);

export const logoutUser = createAsyncThunk(
	'auth/logoutUser',
	async(_, { rejectWithValue }) => {
		try {
			const res = await api.post('/auth/logout');
			return res.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data?.message || 'failed to logout');
			}
			return rejectWithValue('An unexpected error occurred at logout.');
		}
	}
)

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearAuthError: (state) => {
			state.error = null;
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
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(fetchCurrentUser.pending, (state) => {
				state.isCheckingAuth = true;
			})
			.addCase(fetchCurrentUser.fulfilled, (state, action) => {
				state.isCheckingAuth = false;
				state.user = action.payload;
			})
			.addCase(fetchCurrentUser.rejected, (state) => {
				state.isCheckingAuth = false;
				state.user = null;
			})
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.loading = false;
				state.user = null;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default authSlice.reducer;
export const { clearAuthError } = authSlice.actions;
