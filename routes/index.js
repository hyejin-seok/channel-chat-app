const express = require("express");
const router = express.Router();
const messageRoutes = require("./messageRoutes");
const roomRoutes = require("./roomRoutes");
const userRoutes = require("./userRoutes");

router.use("/messages", messageRoutes);
router.use("/rooms", roomRoutes);
router.use("/users", userRoutes);

module.exports = router;
