import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer, // ここにスライスを登録していく
  },
});

// TypeScript用の型定義（これをしておくと後で楽になります）
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;