import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.js";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetails() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  useEffect(() => {
    api.get(`/products/${id}`).then(({ data }) => setP(data));
  }, [id]);

  if (!p) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <div className="grid" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
        <img src={p.image} alt={p.name} style={{ width:"100%", borderRadius:12 }} />
        <div>
          <h2>{p.name}</h2>
          <div className="mt-2 badge">${p.price?.toFixed(2)}</div>
          <p className="mt-2">{p.description}</p>
          <div className="mt-2">Stock: {p.countInStock}</div>
          <div className="flex mt-2">
            <input className="input" type="number" min="1" value={qty} onChange={(e)=>setQty(Number(e.target.value))} style={{ width:100 }} />
            <button className="btn" onClick={()=>add(p, qty)}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
