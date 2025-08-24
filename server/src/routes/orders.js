import express from "express";
import Order from "../models/Order.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// Create order
router.post("/", protect, async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user._id,
      ...req.body
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// My orders
router.get("/mine", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort("-createdAt");
  res.json(orders);
});

// All orders (admin)
router.get("/", protect, admin, async (req, res) => {
  const orders = await Order.find().populate("user", "name email").sort("-createdAt");
  res.json(orders);
});

// Mark delivered (admin)
router.put("/:id/deliver", protect, admin, async (req, res) => {
  const o = await Order.findById(req.params.id);
  if (!o) return res.status(404).json({ message: "Order not found" });
  o.isDelivered = true;
  o.deliveredAt = new Date();
  await o.save();
  res.json(o);
});

export default router;
