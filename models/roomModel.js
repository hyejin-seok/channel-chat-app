const mongoose = require("mongoose");

module.exports = (chatDB) => {
  const roomSchema = new mongoose.Schema({
    name: String,
  });

  const Room = chatDB.model("Room", roomSchema);
  return Room;
};
