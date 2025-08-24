import express from "express";
import Stripe from "stripe";
import axios from "axios";

const router = express.Router();

// Stripe PaymentIntent (demo)
router.post("/stripe/create-payment-intent", async (req, res) => {
  try {
    const stripeSecret = process.env.STRIPE_SECRET;
    if (!stripeSecret) return res.status(400).json({ message: "Stripe not configured" });
    const stripe = new Stripe(stripeSecret);
    const { amount } = req.body; // amount in cents
    const intent = await stripe.paymentIntents.create({
      amount: Math.max(50, Math.floor(amount || 0)),
      currency: "usd",
      automatic_payment_methods: { enabled: true }
    });
    res.json({ clientSecret: intent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Stripe error" });
  }
});

// PayPal order create (demo)
router.post("/paypal/create-order", async (req, res) => {
  try {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    if (!clientId) return res.status(400).json({ message: "PayPal not configured" });
    // NOTE: In production, also use PAYPAL_SECRET to get access token. This is a stub.
    // Return a fake id so frontend flow can be tested.
    res.json({ id: "PAYPAL_ORDER_ID_DEMO_123" });
  } catch (err) {
    res.status(500).json({ message: "PayPal error" });
  }
});

export default router;
