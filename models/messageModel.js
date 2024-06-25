const mongoose = require("mongoose");
const { connectDBs } = require("../src/db");

let Message;
(async () => {
  try {
    const { chatDB } = await connectDBs();
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
    Message = chatDB.model("Message", messageSchema);
    module.exports = Message;
  } catch (error) {
    console.error("Error setting up Message model:", error);
  }
})();
