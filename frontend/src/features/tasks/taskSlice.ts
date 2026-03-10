import { createAsyncThunk, createSlice, isAction, type PayloadAction } from '@reduxjs/toolkit';
import type { Task } from './task';
import { API_URL } from '../../config/env';

interface TaskState {
  tasks: Task[];
  loading: boolean;
}

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async({ id, updates }: { id: string; updates: Partial<Task> }) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      throw new Error('server error: patch task');
    }

    return (await res.json()) as Task;
  }
)

export type CreateTaskPayload = Pick<Task, 'title' | 'description' | 'difficulty' | 'duration' | 'priority' >;

export const addTask= createAsyncThunk(
  'tasks/addTask',
  async(taskData: CreateTaskPayload) => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!res.ok) {
      throw new Error('server error: add task');
    }

    return (await res.json()) as Task;
  }
)

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async() => {
    const res = await fetch(`${API_URL}/tasks`);
    const data = await res.json();

    return data;
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
  extraReducers: (builders) => {
    builders
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

      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  }
});

export default taskSlice.reducer;