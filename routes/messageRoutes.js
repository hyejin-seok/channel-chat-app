const express = require("express");
const router = express.Router();
const roomController = require("../controllers/messageController");

router.get("/", roomController.getAllMessages);
router.post("/", roomController.createMessage);

module.exports = router;
