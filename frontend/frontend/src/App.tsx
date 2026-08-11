import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TasksPage from "./Pages/TasksPage";
import TaskDetailsPage from "./Pages/TaskDetailsPage";
import AddTaskPage from './Pages/AddTaskPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/add" element={<AddTaskPage />} />
        <Route path="/tasks/:id" element={<TaskDetailsPage />} />

        <Route
          path="*"
          element={<Navigate to="/tasks" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;