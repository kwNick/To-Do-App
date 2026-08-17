import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../Services/AuthService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    try { await register(username, password); navigate("/login"); }
    catch (err) { setError(err instanceof Error ? err.message : "Registration failed"); }
  };

  return <div className="authPage"><h1>Register</h1>
    <form onSubmit={submit}>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    {error && <p>{error}</p>}
    <p>Already have an account? <Link to="/login">Login</Link></p>
  </div>;
}
