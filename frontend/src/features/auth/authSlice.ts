import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./auth";
import api from '@/lib/api';

const	initialState: AuthState = {
	user:		null,
	loading:	true,
	error:		null,
}

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async (credentials: { email: string; password: string }, {rejectWithValue}) => {
		try {
			const res = await api.post('/auth/login', credentials);

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

			return res.data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'failed at register');
		}
	}
);

export const fetchCurrentUser = createAsyncThunk(
	'auth/fetchCurrentUser',
	async(_, { rejectWithValue }) => {
		try {
			const res = await api.get('/auth/me');
			return res.data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'failed to fetch profile');
		}
	}
);

export const logoutUser = createAsyncThunk(
	'auth/logoutUser',
	async(_, { rejectWithValue }) => {
		try {
			const res = await api.post('/auth/logout');
			return res.data;
		} catch (error: any) {
			return rejectWithValue(error.response?.data?.message || 'failed to logout');
		}
	}
)

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {

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
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCurrentUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(fetchCurrentUser.rejected, (state, action) => {
				state.loading = false;
				state.user = null;
				state.error = action.payload as string;
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
