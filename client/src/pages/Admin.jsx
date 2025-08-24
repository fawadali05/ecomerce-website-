import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Admin() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name:"", brand:"", category:"", price:0, countInStock:0, image:"", description:"" });
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState("products");

  const load = async () => {
    const { data } = await api.get("/products");
    setProducts(data);
    if (user?.isAdmin) {
      const os = await api.get("/orders");
      setOrders(os.data);
    }
  };

  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    await api.post("/products", form);
    setForm({ name:"", brand:"", category:"", price:0, countInStock:0, image:"", description:"" });
    load();
  };
  const del = async (id) => { await api.delete(`/products/${id}`); load(); };

  if (!user?.isAdmin) return <div className="container"><p>Admin only.</p></div>;

  return (
    <div className="container">
      <div className="flex">
        <button className="btn" onClick={()=>setTab("products")}>Products</button>
        <button className="btn secondary" onClick={()=>setTab("orders")}>Orders</button>
      </div>

      {tab === "products" ? (
        <div className="grid" style={{ gridTemplateColumns: "1.2fr .8fr" }}>
          <div className="card">
            <h3>All Products</h3>
            <table className="table mt-2">
              <thead><tr><th>Name</th><th>Price</th><th>Stock</th><th></th></tr></thead>
              <tbody>
                {products.map(p => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>${p.price}</td>
                    <td>{p.countInStock}</td>
                    <td><button className="btn danger" onClick={()=>del(p._id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <form className="card" onSubmit={save}>
            <h3>Create Product</h3>
            {["name","brand","category","image"].map(k=>(
              <input key={k} className="input mt-2" placeholder={k} value={form[k]}
                onChange={(e)=>setForm({...form, [k]:e.target.value})} />
            ))}
            <input className="input mt-2" type="number" placeholder="price" value={form.price}
              onChange={(e)=>setForm({...form, price:Number(e.target.value)})} />
            <input className="input mt-2" type="number" placeholder="countInStock" value={form.countInStock}
              onChange={(e)=>setForm({...form, countInStock:Number(e.target.value)})} />
            <textarea className="input mt-2" placeholder="description" value={form.description}
              onChange={(e)=>setForm({...form, description:e.target.value})} />
            <button className="btn mt-2">Save</button>
          </form>
        </div>
      ) : (
        <div className="card">
          <h3>Orders</h3>
          <table className="table mt-2">
            <thead><tr><th>ID</th><th>User</th><th>Total</th><th>Paid</th><th>Delivered</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o._id}>
                  <td>{o._id.slice(-6)}</td>
                  <td>{o.user?.name}</td>
                  <td>${o.totalPrice?.toFixed(2)}</td>
                  <td>{o.isPaid ? "Yes" : "No"}</td>
                  <td>{o.isDelivered ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
