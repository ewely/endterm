const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find().populate("assignedTo project");
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};

exports.addComment = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: { user: req.user.id, text: req.body.text } } },
    { new: true }
  );
  res.json(task);
};

exports.taskStatsByProject = async (req, res) => {
  const stats = await Task.aggregate([
    { $group: { _id: "$project", totalTasks: { $sum: 1 }, avgPriority: { $avg: "$priority" } } },
    { $sort: { totalTasks: -1 } }
  ]);
  res.json(stats);
};
