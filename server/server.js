const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Allow frontend to connect
app.use(cors());

// Middleware to handle JSON
app.use(express.json());

// Serve uploads if needed in future
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/mern_cart_db")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo Error:", err));

// Routes
app.use("/products", require("./routes/productRoutes"));
app.use("/cart", require("./routes/cartRoutes"));

// Start Server
app.listen(3000, () =>
  console.log(`Server running at http://localhost:3000`)
);
