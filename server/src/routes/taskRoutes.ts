import express from "express";
import { authenticate } from "../middleware/authMiddleware"; // Assuming this path
import { createTask, getTasks, deleteTask } from "../controllers/taskController";

const router = express.Router();

router.use(authenticate);

// Task routes
router.post("/tasks", createTask); // Create task
router.get("/tasks", getTasks); // Get tasks
router.delete("/tasks/:id", deleteTask); // Delete task

export default router;

