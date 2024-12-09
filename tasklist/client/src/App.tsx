import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import Login  from "./pages/Login";
import TaskList from "./pages/TaskList";

function App() {
  return (
    <Router>

      <NavBar />

      <Routes>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<TaskList />} />

      </Routes>
    </Router>
  );
}

export default App;

