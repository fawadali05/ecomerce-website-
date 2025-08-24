import React from "react";
import { useCart } from "../context/CartContext.jsx";
import api from "../services/api.js";

export default function Cart() {
  const { cart, update, remove, totals, clear } = useCart();

  const checkout = async () => {
    try {
      // 1) Create order
      const order = {
        orderItems: cart.map(c => ({ product: c._id, name: c.name, qty: c.qty, price: c.price, image: c.image })),
        shippingAddress: { address:"Demo St", city:"Karachi", postalCode:"0000", country:"PK" },
        paymentMethod: "card",
        itemsPrice: totals.itemsPrice,
        taxPrice: totals.taxPrice,
        shippingPrice: totals.shippingPrice,
        totalPrice: totals.totalPrice
      };
      const { data } = await api.post("/orders", order);
      alert("Order created! (ID: " + data._id + ") — proceed to pay.");
      // 2) Stripe intent (demo)
      const intent = await api.post("/payments/stripe/create-payment-intent", { amount: Math.round(totals.totalPrice * 100) });
      if (intent.data?.clientSecret) {
        alert("Stripe clientSecret received (demo): " + intent.data.clientSecret.substring(0, 12) + "...");
      } else {
        alert("Stripe not configured — use COD/manual for now.");
      }
      clear();
    } catch (e) {
      alert("Checkout failed. Login required? " + (e?.response?.data?.message || e.message));
    }
  };

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <div className="grid" style={{ gridTemplateColumns: "1.5fr .8fr" }}>
          <div className="card">
            {cart.map((c) => (
              <div key={c._id} className="flex" style={{ justifyContent:"space-between", marginBottom: ".75rem" }}>
                <div className="flex">
                  <img src={c.image} alt={c.name} style={{ width:64, height:64, borderRadius:8, objectFit:"cover" }} />
                  <div>
                    <div><strong>{c.name}</strong></div>
                    <div className="mt-2">${(c.price*c.qty).toFixed(2)}</div>
                  </div>
                </div>
                <div className="flex">
                  <input className="input" type="number" min="1" value={c.qty} onChange={(e)=>update(c._id, Number(e.target.value))} style={{ width:80 }} />
                  <button className="btn danger" onClick={()=>remove(c._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <h3>Summary</h3>
            <div className="mt-2">Items: ${totals.itemsPrice.toFixed(2)}</div>
            <div className="mt-2">Tax (15%): ${totals.taxPrice.toFixed(2)}</div>
            <div className="mt-2">Shipping: ${totals.shippingPrice.toFixed(2)}</div>
            <div className="mt-2"><strong>Total: ${totals.totalPrice.toFixed(2)}</strong></div>
            <button className="btn mt-4" onClick={checkout}>Pay (Demo)</button>
          </div>
        </div>
      )}
    </div>
  );
}
