const mongoose = require("mongoose");
const { connectDBs } = require("../src/db");
// const connectAuthDB = require("../src/authDB");

const { authDB } = connectDBs();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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
