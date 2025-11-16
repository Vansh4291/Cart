const express = require("express");
const Product = require("../model/Products");

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { title, price, image } = req.body;

    if (!title || !price || !image) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newProduct = new Product({
      title,
      price,
      image,
    });

    await newProduct.save();

    res.json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
