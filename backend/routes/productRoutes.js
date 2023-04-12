const express = require("express");
const {
  getAllProducts,
  getProductById,
} = require("../controllers/productController.js");

const router = express.Router();

// @desc fetch all the products
// @route GET /api/products
// @access PUBLIC
router.route("/").get(getAllProducts);

// @desc Fetch a single product by id
// @route GET /api/products/:id
// @access PUBLIC
router.route("/:id").get(getProductById);

module.exports = router;
