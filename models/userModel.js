const mongoose = require("mongoose");
const { connectDBs } = require("../src/db");
const { authDB } = connectDBs();

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

const User = authDB.model("User", userSchema);
module.exports = User;

//
// module.exports = mongoose.model("User", userSchema);
