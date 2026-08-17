import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getCurrentUser, login as loginRequest } from "../Services/AuthService";
import type { User } from "../Types/Types";

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("token");
      if (!token) { setLoading(false); return; }
      try {
        setUser(await getCurrentUser(token));
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = async (username: string, password: string) => {
    const data = await loginRequest(username, password);
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, isAuthenticated: user !== null, loading, login, logout }}>
    {children}
  </AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
