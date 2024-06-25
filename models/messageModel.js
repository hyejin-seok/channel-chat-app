const mongoose = require("mongoose");
const { connectDBs } = require("../src/db");

let chatDB;
(async () => {
  const dbs = await connectDBs();
  chatDB = dbs.chatDB;
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
})();
