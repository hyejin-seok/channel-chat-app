const mongoose = require("mongoose");
const { connectDBs } = require("../src/db");

let User;
(async () => {
  const { authDB } = await connectDBs();
  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  });

  User = authDB.model("User", userSchema);
  module.exports = User;
})();
