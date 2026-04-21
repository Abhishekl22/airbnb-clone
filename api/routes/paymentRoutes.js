const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const { isLoggedIn } = require("../middlewares/user");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Create payment intent
router.post("/create-payment-intent", isLoggedIn, async (req, res) => {
  try {
    const { amount } = req.body; // amount in rupees

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in paise (₹1 = 100)
      currency: "inr",
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe payment error:", error);
    res.status(500).json({ message: "Payment initialization failed", error });
  }
});

module.exports = router;
