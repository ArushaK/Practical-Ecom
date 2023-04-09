const express = require("express");
const dotenv = require("dotenv");
import connectDB from "./config/db.js";
const products = require("./data/products");

dotenv.config();
const app = express();
connectDB();

app.get("/", (req, res) => {
  res.send("API is running....");
  res.json(products);
});

app.get("/api/products", (req, res) => {
  console.log("first");
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
