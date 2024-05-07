const express = require("express");
const router = express.Router();
const roomController = require("../controllers");

router.get("/", roomController.getAllRoom);

module.exports = router;
