import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    try { await login(username, password); navigate("/tasks"); }
    catch (err) { setError(err instanceof Error ? err.message : "Login failed"); }
  };

  return <div className="authPage"><h1>Login</h1>
    <form onSubmit={submit}>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    {error && <p>{error}</p>}
    <p>Don't have an account? <Link to="/register">Register</Link></p>
  </div>;
}
