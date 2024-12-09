import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
  user: mongoose.Schema.Types.ObjectId;
  description: string;
}

const taskSchema = new Schema<ITask>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;
