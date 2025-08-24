import React, { createContext, useContext, useMemo, useState } from "react";

const CartCtx = createContext(null);
export const useCart = () => useContext(CartCtx);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const add = (item, qty = 1) => {
    setCart((prev) => {
      const exist = prev.find((x) => x._id === item._id);
      if (exist) return prev.map((x) => x._id === item._id ? { ...x, qty: x.qty + qty } : x);
      return [...prev, { ...item, qty }];
    });
  };
  const remove = (id) => setCart((p) => p.filter((x) => x._id !== id));
  const update = (id, qty) => setCart((p) => p.map((x) => x._id === id ? { ...x, qty } : x));
  const clear = () => setCart([]);

  const totals = useMemo(() => {
    const itemsPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 200 ? 0 : 10;
    const taxPrice = itemsPrice * 0.15;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    return { itemsPrice, shippingPrice, taxPrice, totalPrice };
  }, [cart]);

  return <CartCtx.Provider value={{ cart, add, remove, update, clear, totals }}>{children}</CartCtx.Provider>;
}
