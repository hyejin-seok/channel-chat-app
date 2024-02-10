// const Message = require("../models/messageModel");

// GET ALL messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD message
const createMessage = async (req, res) => {
  try {
    const newMessage = new Message({
      user: req.body.user,
      text: req.body.text,
    });
    const addedMessage = await newMessage.save();
    res.json(addedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllMessages,
  createMessage,
};
