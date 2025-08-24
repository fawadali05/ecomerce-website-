import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/register", { name, email, password });
      login(data);
      navigate("/");
    } catch (e) {
      setError(e?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container" style={{ maxWidth:460 }}>
      <h2>Create Account</h2>
      <form className="card mt-2" onSubmit={onSubmit}>
        <input className="input mt-2" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input className="input mt-2" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className="input mt-2" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        {error && <div className="mt-2" style={{ color:"#ef4444" }}>{error}</div>}
        <button className="btn mt-2">Register</button>
      </form>
    </div>
  );
}
