const mongoose = require("mongoose");

module.exports = (authDB) => {
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
  return User;
};
