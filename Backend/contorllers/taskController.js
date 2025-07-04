

import userModel from '../models/userModel.js';
import actionModel from '../models/actionModel.js';
import taskModel from '../models/taskModel.js';

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel
      .find({
        $or: [
          { createdBy: req.user._id },
          { assignedTo: req.user._id }
        ]
      })
      .populate('assignedTo');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};


export const createTask = (io) => async (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || !description || !priority) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const task = await taskModel.create({
      title,
      description,
      priority,
      createdBy: req.user._id,
    });

    io.emit('task:created', task);

    await actionModel.create({
      action: `Created task "${title}"`,
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Task creation failed:", error.message);
    res.status(400).json({ message: error.message || "Task creation failed" });
  }
};


export const updateTask = (io) => async (req, res) => {
  const { id } = req.params;
  const clientTask = req.body;

  try {
    const serverTask = await taskModel.findById(id);
    if (!serverTask) return res.status(404).json({ message: "Task not found" });

    // Conflict check
    if (
      clientTask.lastUpdated &&
      new Date(clientTask.lastUpdated) < new Date(serverTask.lastUpdated)
    ) {
      return res.status(409).json({
        message: "Conflict detected",
        serverTask,
      });
    }

    const updatedTask = await taskModel.findByIdAndUpdate(
      id,
      { ...clientTask, lastUpdated: new Date() },
      { new: true }
    );

    // 🔥 Realtime + Log
    io.emit("task:updated", updatedTask);

    await actionModel.create({
      action: `Updated task "${updatedTask.title}"`,
      user: req.user._id,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



// Delete a task
export const deleteTask = (io) => async (req, res) => {


  try {
    const task = await taskModel.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    io.emit('task:deleted', task._id);

    await actionModel.create({
      action: `Deleted task "${task.title}"`,
      user: req.user._id,
    });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};

//  Smart assign task to least busy user
export const smartAssign = (io) => async (req, res) => {
  try {
    const users = await userModel.find();

    const userTaskCounts = await Promise.all(users.map(async (user) => {
      const count = await taskModel.countDocuments({
        assignedTo: user._id,
        status: { $in: ['Todo', 'In Progress'] },
      });
      return { user, count };
    }));

    const leastBusy = userTaskCounts.reduce((min, u) =>
      u.count < min.count ? u : min, userTaskCounts[0]);

    const task = await taskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.assignedTo = leastBusy.user._id;
    task.lastUpdated = Date.now();
    await task.save();

    io.emit('task:updated', task);

    await actionModel.create({
      action: `Smart assigned task "${task.title}" to ${leastBusy.user.name}`,
      user: req.user._id,
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to smart assign task" });
  }
};

//  Get current user's last 20 logs
export const getLogs = async (req, res) => {
  try {
    const logs = await actionModel.find({ user: req.user._id })
      .sort({ timestamp: -1 })
      .limit(20)
      .populate('user', 'name');

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch logs" });
  }
};
