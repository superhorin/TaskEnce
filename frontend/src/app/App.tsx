import { TaskPage } from '../pages/TaskPage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/features/auth/ProtectedRoute';
import { LoginPage } from '@/pages/LoginPage';
import { MainLayout } from '@/layouts/MainLayout';
import { PublicRoute } from '@/features/auth/PublicRoute';
import { RegisterPage } from '@/pages/RegisterPage';
import { useAppDispatch, useAppSelector } from './hooks';
import { useEffect } from 'react';
import { fetchCurrentUser } from '@/features/auth/authSlice';

function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/tasks" element={<TaskPage />} />
            {/* <Route path="/tasks/:id" element={<TaskDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} /> */}
          </Route>
        </Route>

        <Route path="/register" element={<RegisterPage />} />

        <Route path="*" element={<Navigate replace to="/tasks" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
