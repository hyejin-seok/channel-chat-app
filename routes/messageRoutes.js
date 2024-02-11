const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.get("/", messageController.chatRoom);
router.get("/:id", messageController.getMessagesByRoomId);
// router.get("/:id", messageController.getRoomMessages);
// router.post("/", messageController.createRoomMessage);

module.exports = router;
