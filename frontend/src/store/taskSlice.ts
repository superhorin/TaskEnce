import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '../types/task';

// 1. 状態（State）の型定義
interface TaskState {
  items: Task[];
  loading: boolean;
}

const initialState: TaskState = {
  items: [],
  loading: false,
};

// 2. スライスの作成（C++のクラス設計に近い）
export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // 取得開始
    fetchStart: (state) => {
      state.loading = true;
    },
    // 取得成功（データのセット）
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    // エラーなどの終了
    fetchEnd: (state) => {
      state.loading = false;
    },
  },
});

// コンポーネントから呼ぶための「命令（Action）」をエクスポート
export const { fetchStart, setTasks, fetchEnd } = taskSlice.actions;
export default taskSlice.reducer;