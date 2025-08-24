import express from "express";
import Product from "../models/Product.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// GET /api/products?search=&category=&min=&max=&sort=price|createdAt
router.get("/", async (req, res) => {
  const { search = "", category, min, max, sort = "-createdAt" } = req.query;
  const q = {
    name: { $regex: search, $options: "i" }
  };
  if (category) q.category = category;
  if (min || max) q.price = {
    ...(min ? { $gte: Number(min) } : {}),
    ...(max ? { $lte: Number(max) } : {})
  };

  const products = await Product.find(q).sort(sort);
  res.json(products);
});

// GET single
router.get("/:id", async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: "Product not found" });
  res.json(p);
});

// Create (admin)
router.post("/", protect, admin, async (req, res) => {
  const p = await Product.create(req.body);
  res.status(201).json(p);
});

// Update (admin)
router.put("/:id", protect, admin, async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!p) return res.status(404).json({ message: "Product not found" });
  res.json(p);
});

// Delete (admin)
router.delete("/:id", protect, admin, async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: "Product not found" });
  await p.deleteOne();
  res.json({ message: "Deleted" });
});

export default router;
