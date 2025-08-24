import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/login", { email, password });
      login(data);
      navigate("/");
    } catch (e) {
      setError(e?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container" style={{ maxWidth:460 }}>
      <h2>Login</h2>
      <form className="card mt-2" onSubmit={onSubmit}>
        <input className="input mt-2" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className="input mt-2" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        {error && <div className="mt-2" style={{ color:"#ef4444" }}>{error}</div>}
        <button className="btn mt-2">Login</button>
      </form>
      <div className="mt-2" style={{ color:"#6b7280" }}>Demo admin seeding: <code>admin@example.com / admin123</code></div>
    </div>
  );
}
