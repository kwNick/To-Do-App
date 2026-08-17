export interface Task {
  id: number;
  name: string;
  description: string;
  deadline: string;
  deadlineTime: string;
  priority: "Low" | "Medium" | "High";
  status: "In Progress" | "Expired";
  completed: boolean;
};

export type TaskTab = "To-Do" | "Completed" | "All";

export type User = { id: number; username: string; };
export type LoginResponse = { token: string; user: User; };