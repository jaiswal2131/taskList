import Task from "../models/Task";
import { Request, Response } from "express";

// Create a task
export const createTask = async (req: Request, res: Response) => {
  const { description } = req.body;
  const userId = req.user?.id;

  try {
    const task = new Task({ description, user: userId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all tasks for a user
export const getTasks = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  try {
    const tasks = await Task.find({ user: userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;

  try {
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
