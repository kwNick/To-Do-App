const API_URL = "http://localhost:3000";

export const register = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error((await response.json().catch(() => null))?.message || "Registration failed");
  return response.json();
};

export const login = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error((await response.json().catch(() => null))?.message || "Login failed");
  return response.json();
};

export const getCurrentUser = async (token: string) => {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Unable to get current user");
  return response.json();
};
