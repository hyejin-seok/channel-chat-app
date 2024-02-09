const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// SIGN UP (ADD user)
const singup = async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };
  const existingUser = await User.findOne({ username: data.name });
  if (existingUser) {
    res.send("User alreday exists. Please choose a different username");
  } else {
    try {
      // has the password using bctypt
      const saltRounds = 10; // Number of salt round for bcrypt
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
      const newUser = new User({
        username: data.name,
        password: hashedPassword,
      });
      const addedUser = await newUser.save();
      res.json(addedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

const login = async (req, res) => {
  try {
    const check = await User.findOne({ username: req.body.username });
    if (!check) {
      return res.status(404).json({ message: "Item not found" });
    }
    const isPsswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (isPsswordMatch) {
      req.render("index");
    } else {
      req.send("Wrong password");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  singup,
  login,
};
