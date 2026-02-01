const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
  priority: { type: Number, default: 1 },
  dueDate: Date,
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }, 
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [commentSchema] 
}, { timestamps: true });

taskSchema.index({ project: 1, status: 1 });

module.exports = mongoose.model("Task", taskSchema);
