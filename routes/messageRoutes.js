const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.get("/", messageController.chatRoom);
router.get("/:id", messageController.getMessagesByRoomId);
router.post("/", messageController.saveMessage);

module.exports = router;
