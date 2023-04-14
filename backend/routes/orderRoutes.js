const express = require("express");
const {
  addOrderItems,
  getOrderById,
  updateOrderToPay,
  getMyOrders,
} = require("../controllers/orderController");
const protectRoute = require("../middleware/authMiddleware");

const router = express.Router();

// @desc  create a new order
// @route GET /api/orders
// @access PRIVATE
router.route("/").post(protectRoute, addOrderItems);

// @desc  get an order by id
// @route GET /api/orders/:id
// @access PRIVATE
router.route("/:id").get(protectRoute, getOrderById);

// @desc  get an order by id
// @route GET /api/orders/:id/pay
// @access PRIVATE
router.route("/:id/pay").put(protectRoute, updateOrderToPay);

// @desc  fetch the orders of the user logged in
// @route GET /api/orders/myorders
// @access PRIVATE
router.route("/myorders").get(protectRoute, getMyOrders);

module.exports = router;
