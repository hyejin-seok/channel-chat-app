const mongoose = require("mongoose");
// const connectChatDB = require("../src/chatDB");
const { connectDBs } = require("../src/db");

const { chatDB } = connectDBs();

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    room: { type: String, required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Message = chatDB.model("Message", messageSchema);
module.exports = Message;
