import type { Task } from "../Types/Types";

const API_URL = "http://localhost:3000";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message || "Request failed");
  }
  return response.json();
};

export const getTasks = async (): Promise<Task[]> =>
  handleResponse(await fetch(`${API_URL}/tasks`, { headers: authHeaders() }));

export const getTask = async (id: string): Promise<Task> =>
  handleResponse(await fetch(`${API_URL}/tasks/${id}`, { headers: authHeaders() }));

export const createTask = async (task: Omit<Task, "id" | "userId">) =>
  handleResponse(await fetch(`${API_URL}/tasks`, {
    method: "POST", headers: authHeaders(), body: JSON.stringify(task)
  }));

export const updateTask = async (id: number, updates: Partial<Task>) =>
  handleResponse(await fetch(`${API_URL}/tasks/${id}`, {
    method: "PATCH", headers: authHeaders(), body: JSON.stringify(updates)
  }));

export const deleteTask = async (id: number) =>
  handleResponse(await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE", headers: authHeaders()
  }));
