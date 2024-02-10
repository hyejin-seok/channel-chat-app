const mongoose = require("mongoose");
// const connectChatDB = require("../src/chatDB");
const { connectDBs } = require("../src/db");

const { chatDB } = connectDBs();

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    room: { type: String, required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// const messageSchema = new mongoose.Schema({
//   user: String,
//   text: String,
//   // timestamp: { type: Date, default: Date.now },
// });

const Message = chatDB.model("Message", messageSchema);
module.exports = Message;
