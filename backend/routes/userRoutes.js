const express = require("express");
const {
  authUser,
  getUserProfile,
  registerUser,
  getUserById,
} = require("../controllers/userController");
const protectRoute = require("../middleware/authMiddleware");

const router = express.Router();

// @desc register a new user
// @route POST /api/users/
// @access PUBLIC
router.route("/").post(registerUser);

// @desc authenticate user and get token
// @route POST /api/users/login
// @access PUBLIC
router.route("/login").post(authUser);

// @desc get data for an authenticated user
// @route GET /api/users/profile
// @access PRIVATE
router.route("/profile").get(protectRoute, getUserProfile);

//
// @desc Delete a user, get a user by id, update the user
// @route GET /api/users/:id
// @access PRIVATE
router.route("/:id").get(protectRoute, getUserById);

module.exports = router;
