const Message = require("../models/messageModel");
const User = require("../models/userModel");

// chatRoom Page
const chatRoom = (req, res) => {
  res.render("chatRoom", {
    pageTitle: "ChatRoom",
    currentRoomId: req.session.currentRoomId,
  });
};

const getMessagesByRoomId = async (req, res) => {
  try {
    const roomId = req.params.id;
    const messages = await Message.find({ room: roomId });
    if (!messages) {
      return res.status(404).json({ message: "Item not found" });
    }
    console.log("messages >>>", messages);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const saveMessage = async (req, res) => {
  try {
    const { room, text, username } = req.body; // Extract room and text from request body

    // Create the new message
    const newMessage = new Message({
      text: text,
      sender: username,
      room: room,
    });

    // Save the new message
    const addedMessage = await newMessage.save();
    res.json(addedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  chatRoom,
  getMessagesByRoomId,
  saveMessage,
};
