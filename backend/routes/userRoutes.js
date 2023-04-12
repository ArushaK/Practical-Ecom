const express = require("express");
const { authUser } = require("../controllers/userController");

const router = express.Router();

// @desc authenticate user and get token
// @route POST /api/users/login
// @access PUBLIC
router.route("/login").post(authUser);

module.exports = router;
