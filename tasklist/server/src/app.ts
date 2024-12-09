import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { json } from "body-parser";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import mongoose from 'mongoose';


dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
