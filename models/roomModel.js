const mongoose = require("mongoose");
const { connectDBs } = require("../src/db");

const { chatDB } = connectDBs();

const roomSchema = new mongoose.Schema({
  name: String,
});

const Room = chatDB.model("Room", roomSchema);
module.exports = Room;
