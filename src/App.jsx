import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/main_page/MainPage";
import CreateTaskPage from "./components/add_task_page/CreateTaskPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create-task" element={<CreateTaskPage />} />
      </Routes>
    </Router>
  );
}

export default App;
