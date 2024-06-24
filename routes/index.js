const express = require("express");
const router = express.Router();
const homeRoutes = require("./homeRoutes");
const messageRoutes = require("./messageRoutes");
const roomRoutes = require("./roomRoutes");
const userRoutes = require("./userRoutes");

router.use("/users", userRoutes);

// Middleware for user authentication
const authenticateUser = (req, res, next) => {
  if (!req.session.username) {
    return res.redirect("/users/login");
  }
  if (req.cookies.userCookie) {
    return next();
  }
  res.redirect("/users/login");
};

router.use("/", authenticateUser, homeRoutes);
router.use("/messages", authenticateUser, messageRoutes);
router.use("/rooms", authenticateUser, roomRoutes);

module.exports = router;
