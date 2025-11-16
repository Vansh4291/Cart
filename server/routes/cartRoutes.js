const express = require("express");
const CartOrder = require("../model/CartOrder");

const router = express.Router();

// Get all past orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await CartOrder.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Checkout (place order)
router.post("/checkout", async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const newOrder = new CartOrder({
      items: cartItems.map((i) => ({
        name: i.title,
        price: i.price,
        qty: i.qty,
      })),
      totalAmount: total,
    });

    await newOrder.save();

    res.json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
