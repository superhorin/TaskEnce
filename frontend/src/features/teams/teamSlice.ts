import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Membership } from "./membership";
import api from "@/lib/api";
import axios from "axios";

interface TeamState {
	members:	Membership[];
	loading:	boolean;
}

const initialState: TeamState = {
	members: 	[],
	loading:	false,	
};

export const fetchTeams = createAsyncThunk(
	'team/fetchTeams',
	async(_, { rejectWithValue }) => {
		try {
			const res = await api.get('/team');

			return res.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return rejectWithValue(error.response?.data?.message || 'failed at fetching teams');
			}
			return rejectWithValue('An unexpected error occurred at fetching teams.');
		}
	}
)

export const teamSlice = createSlice({
	name: 'team',
	initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTeams.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchTeams.fulfilled, (state, action) => {
				state.loading = false;
				state.members = action.payload;
			})
			.addCase(fetchTeams.rejected, (state, action) => {
				state.loading = false;
				console.log('error: ', action.error.message);
			});
	},
})

export default teamSlice.reducer;
