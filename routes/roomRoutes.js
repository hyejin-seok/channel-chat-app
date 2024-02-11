const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

router.get("/", roomController.getAllRoom);

module.exports = router;
