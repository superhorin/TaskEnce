import { TaskPage } from '../pages/TaskPage'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/features/auth/ProtectedRoute';
import { LoginPage } from '@/pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          {/* <Route element={<MainLayout />}> */}
            <Route path="/tasks" element={<TaskPage />} />
            {/* <Route path="/tasks/:id" element={<TaskDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} /> */}
          {/* </Route> */}
        </Route>

        <Route path="*" element={<Navigate replace to="/tasks" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
