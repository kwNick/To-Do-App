// In-memory tasks.
// NOTE: Everything in this file is lost when the server restarts.

const tasks = [
  {
    id: 1,
    userId: 1,
    name: "Go to gym.",
    description: "Gold's Gym",
    deadline: "08/30/2026",
    deadlineTime: "11:59 PM",
    priority: "High",
    status: "In Progress",
    completed: false
  },
  {
    id: 2,
    userId: 1,
    name: "Do Homework.",
    description: "Math/Geography/Reading",
    deadline: "07/15/2024",
    deadlineTime: "11:59 PM",
    priority: "Medium",
    status: "Expired",
    completed: true
  },
  {
    id: 3,
    userId: 1,
    name: "Buy groceries.",
    description: "Milk, Bread, Eggs",
    deadline: "07/30/2024",
    deadlineTime: "11:59 PM",
    priority: "Low",
    status: "Expired",
    completed: true
  },
  {
    id: 4,
    userId: 1,
    name: "Bath Dog.",
    description: "Get shampoo, connect hose, use 2 towels.",
    deadline: "08/11/2026",
    deadlineTime: "04:00 PM",
    priority: "Medium",
    status: "In Progress",
    completed: false
  }
];

module.exports = tasks;