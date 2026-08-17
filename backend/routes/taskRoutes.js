const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const {
  getTasksForUser,
  getTaskForUser,
  createTask,
  updateTask,
  deleteTask
} = require("../services/taskService");

const router = express.Router();

// Every task route requires authentication.
router.use(authenticateToken);

router.get("/", (req, res) => {
  const userTasks = getTasksForUser(req.user.userId);
  res.json(userTasks);
});

router.get("/:id", (req, res) => {
  const taskId = Number.parseInt(req.params.id, 10);

  if (Number.isNaN(taskId)) {
    return res.status(400).json({
      message: "Invalid task id"
    });
  }

  const task = getTaskForUser(taskId, req.user.userId);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.json(task);
});

router.post("/", (req, res) => {
  const { name } = req.body;

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      message: "Task name is required"
    });
  }

  const task = createTask(req.user.userId, req.body);

  res.status(201).json({
    message: "Task added!",
    task
  });
});

router.patch("/:id", (req, res) => {
  const taskId = Number.parseInt(req.params.id, 10);

  if (Number.isNaN(taskId)) {
    return res.status(400).json({
      message: "Invalid task id"
    });
  }

  const task = updateTask(taskId, req.user.userId, req.body);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.json({
    message: "Task updated",
    task
  });
});

router.delete("/:id", (req, res) => {
  const taskId = Number.parseInt(req.params.id, 10);

  if (Number.isNaN(taskId)) {
    return res.status(400).json({
      message: "Invalid task id"
    });
  }

  const deleted = deleteTask(taskId, req.user.userId);

  if (!deleted) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.json({
    message: "Task deleted"
  });
});

module.exports = router;