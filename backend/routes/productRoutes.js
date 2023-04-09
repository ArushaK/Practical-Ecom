const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");

const router = express.Router();

// @desc fetch all the products
// @route GET /api/products
// @access PUBLIC
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// @desc Fetch a single product by id
// @route GET /api/products/:id
// @access PUBLIC
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

module.exports = router;
