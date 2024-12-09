import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Task {
  _id: string;
  description: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Unauthorized");

      const response = await axios.get("http://localhost:4000/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Unauthorized");

      const response = await axios.post(
        "http://localhost:4000/tasks",
        { description: newTask },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setNewTask("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add task");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Unauthorized");

      await axios.delete(`http://localhost:4000/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    } else {
      fetchTasks();
    }
  }, [navigate]);

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Task List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleLogout} style={{ marginBottom: "10px" }}>
        Logout
      </button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.description}
            <button onClick={() => deleteTask(task._id)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask} style={{ marginLeft: "10px" }}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskList;
