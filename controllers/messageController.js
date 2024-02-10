const Message = require("../models/messageModel");
const User = require("../models/userModel");

// GET messages for a specific room
const getRoomMessages = async (req, res) => {
  try {
    const username = req.session.username; // Get the username from the session
    const room = req.params.room; // Get the room from request parameters
    const messages = await Message.find({ room: room }) // Find messages for the specified room
      .populate("sender", "username") // Populate sender field with username
      .exec();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD message to a specific room
const createRoomMessage = async (req, res) => {
  try {
    const { room, text } = req.body; // Extract room and text from request body
    const senderId = req.user._id; // Assuming req.user contains the logged-in user information

    // Check if the sender exists
    const sender = await User.findById(senderId); // Find the sender in the User model
    if (!sender) {
      return res.status(404).json({ message: "Sender not found" });
    }

    // Create the new message
    const newMessage = new Message({
      message: { text: text },
      // users: [senderId],
      sender: senderId,
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
  getRoomMessages,
  createRoomMessage,
};
