import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ p }) {
  return (
    <div className="card">
      <Link to={`/product/${p._id}`}>
        <img src={p.image} alt={p.name} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 8 }} />
      </Link>
      <div className="mt-2">
        <div className="flex" style={{ justifyContent:"space-between" }}>
          <strong>{p.name}</strong>
          <span className="badge">${p.price.toFixed(2)}</span>
        </div>
        <div className="mt-2" style={{ color:"#6b7280" }}>{p.brand} • {p.category}</div>
        <Link className="btn mt-2" to={`/product/${p._id}`}>View</Link>
      </div>
    </div>
  );
}
