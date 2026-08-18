import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TasksPage from "./Pages/TasksPage";
import TaskDetailsPage from "./Pages/TaskDetailsPage";
import AddTaskPage from './Pages/AddTaskPage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './Context/AuthContext';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />} >
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/tasks/add" element={<AddTaskPage />} />
            <Route path="/tasks/:id" element={<TaskDetailsPage />} />
          </Route>
          
          <Route
            path="*"
            element={<Navigate to="/tasks" replace />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;