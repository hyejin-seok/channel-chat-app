const mongoose = require("mongoose");
const { connectDBs } = require("../src/db");

let Room;
(async () => {
  const { chatDB } = await connectDBs();
  const roomSchema = new mongoose.Schema({
    name: String,
  });

  Room = chatDB.model("Room", roomSchema);
  module.exports = Room;
})();
