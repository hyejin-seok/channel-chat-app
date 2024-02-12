const Message = require("../models/messageModel");
const User = require("../models/userModel");

// chatRoom Page
const chatRoom = (req, res) => {
  res.render("chatRoom", { pageTitle: "ChatRoom" });
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

// GET messages for a specific room
const getRoomMessages = async (req, res) => {
  console.log(">>> getRoomMessages");
  try {
    const room = req.params.room; // Get the room from request parameters
    console.log(">>> room", room);
    // const messages = await Message.find({ room: room }) // Find messages for the specified room
    //   .populate("sender", "username") // Populate sender field with username
    //   .exec();
    // res.json(messages);
    // res.render("chatRoom", { pageTitle: "ChatRoom" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD message to a specific room
const createRoomMessage = async (req, res) => {
  console.log(">>> createRoomMessage");
  try {
    const { room, text } = req.body; // Extract room and text from request body

    const username = req.session.username;

    // Check if the user is logged in (username is available in session)
    if (!username) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Find the user document based on the username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the new message
    const newMessage = new Message({
      message: { text: text },
      sender: user._id,
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
  getRoomMessages,
  createRoomMessage,
};
