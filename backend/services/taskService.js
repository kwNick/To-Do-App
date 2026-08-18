const tasks = require("../data/tasks");

function getTasksForUser(userId) {
  return tasks.filter(task => task.userId === userId);
}

function getTaskForUser(taskId, userId) {
  return tasks.find(
    task => task.id === taskId && task.userId === userId
  );
}

function createTask(userId, data) {
  const taskId =
    tasks.length === 0 ? 1 : Math.max(...tasks.map(task => task.id)) + 1;

    function formatTime(time) {
      const [hours, minutes] = time.split(":");

      const date = new Date();
      date.setHours(Number(hours), Number(minutes), 0, 0);

      return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    };

  const newTask = {
    id: taskId,
    userId,
    name: data.name,
    description: data.description || data.name,
    deadline: data.deadline || new Date().toLocaleDateString(),
    deadlineTime: data.deadlineTime ? formatTime(data.deadlineTime) : "11:59 PM",
    priority: data.priority || "Low",
    status: data.status || "In Progress",
    completed: false
  };

  tasks.push(newTask);

  return newTask;
}

function updateTask(taskId, userId, updates) {
  const task = getTaskForUser(taskId, userId);

  if (!task) {
    return null;
  }

  // Only allow known task fields to be updated.
  const allowedFields = [
    "name",
    "description",
    "deadline",
    "deadlineTime",
    "priority",
    "status",
    "completed"
  ];

  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(updates, field)) {
      task[field] = updates[field];
    }
  }

  return task;
}

function deleteTask(taskId, userId) {
  const taskIndex = tasks.findIndex(
    task => task.id === taskId && task.userId === userId
  );

  if (taskIndex === -1) {
    return false;
  }

  tasks.splice(taskIndex, 1);
  return true;
}

module.exports = {
  getTasksForUser,
  getTaskForUser,
  createTask,
  updateTask,
  deleteTask
};