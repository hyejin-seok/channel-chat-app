const mongoose = require("mongoose");

module.exports = (chatDB) => {
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
  return Message;
};
