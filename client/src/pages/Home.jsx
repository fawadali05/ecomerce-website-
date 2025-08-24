import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        const search = params.get("search");
        if (search) query.set("search", search);
        const { data } = await api.get(`/products?${query.toString()}`);
        setProducts(data);
      } catch {}
      setLoading(false);
    };
    fetchProducts();
  }, [params]);

  return (
    <div className="container">
      <h2>Products</h2>
      {loading ? <p>Loading...</p> : (
        <div className="grid grid-4">
          {products.map((p) => <ProductCard key={p._id} p={p} />)}
        </div>
      )}
    </div>
  );
}
