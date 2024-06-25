const mongoose = require("mongoose");
const { connectDBs } = require("../src/db");

let Room;
(async () => {
  try {
    const { chatDB } = await connectDBs();
    const roomSchema = new mongoose.Schema({
      name: String,
    });
    Room = chatDB.model("Room", roomSchema);
    module.exports = Room;
  } catch (error) {
    console.error("Error setting up Room model:", error);
  }
})();
