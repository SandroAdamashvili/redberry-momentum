import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/main_page/MainPage";
import CreateTaskPage from "./components/add_task_page/CreateTaskPage";
import TaskPage from "./components/task_page/TaskPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create-task" element={<CreateTaskPage />} />
        <Route path="/task/:id" element={<TaskPage />} />
      </Routes>
    </Router>
  );
}

export default App;
