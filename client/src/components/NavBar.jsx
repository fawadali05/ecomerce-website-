import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function NavBar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q") || "";
    const url = q ? `/?search=${encodeURIComponent(q)}` : "/";
    navigate(url);
  };

  return (
    <nav className="nav">
      <div className="nav-inner container">
        <Link className="brand" to="/">Fawad Store</Link>
        <form className="search" onSubmit={onSearch}>
          <input className="input" name="q" placeholder="Search products..." />
        </form>
        <div className="flex">
          <Link to="/cart">Cart ({cart.reduce((a, c) => a + c.qty, 0)})</Link>
          {user ? (
            <>
              {user.isAdmin && <Link to="/admin">Admin</Link>}
              <button className="btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
