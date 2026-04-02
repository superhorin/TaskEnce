import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Task } from './task';
import api from '@/lib/api';

interface TaskState {
  tasks: Task[];
  loading: boolean;
}

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async({ id, updates }: { id: string; updates: Partial<Task> }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/tasks/${id}`, updates);

      return res.data;
    } catch(error: any) {
      return rejectWithValue(error.response?.data?.message || 'failed at patching task');
    }
  }
)

export type CreateTaskPayload = Pick<Task, 'title' | 'description' | 'difficulty' | 'duration' | 'priority' | 'dueDate'>;

export const addTask= createAsyncThunk(
  'tasks/addTask',
  async(taskData: CreateTaskPayload, { rejectWithValue }) => {
    try {
      const res = await api.post('/tasks', taskData);

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'failed at adding task');
    }
  }
)

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchTaskById',
  async(id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/tasks/${id}`);

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || `failed at fetching task:${id}`);
    }
  }
)

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async(_,{ rejectWithValue }) => {
    try {
      const res = await api.get('/tasks');

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'failed at fetching tasks');
    }
  }
)

const initialState: TaskState = {
  tasks: [],
  loading: false,
};

// 2. スライスの作成（C++のクラス設計に近い）
export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      //fetchTask
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        console.log('通信エラー:', action.error.message);
      })
      //fetchTaskById
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        const fetchedTask = action.payload;
        const existingIndex = state.tasks.findIndex(t => t.id === fetchedTask.id);

        if (existingIndex !== -1) {
          state.tasks[existingIndex] = fetchedTask;
        } else {
          state.tasks.push(action.payload);
        }
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        console.log('通信エラー:', action.error.message);
      })
      //addTask
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        console.error('Send error:', action.error.message);
      })
      //patchTask
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  }
});

export default taskSlice.reducer;
