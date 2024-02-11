const Room = require("../models/roomModel");

//GET ALL items
const getAllRoom = async (req, res) => {
  console.log(">>> get all room");
  try {
    const rooms = await Room.find(); // this method(function) is from mongoose
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllRoom,
};
