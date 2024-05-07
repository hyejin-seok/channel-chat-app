const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Signup Page
const signup = (req, res) => {
  res.render("auth/signup", { pageTitle: "Sign up - Channel Cluster" }); // "/auth/signup" 안됨
};

// Signup Logic (ADD user)
const signupLogic = async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ username: data.name });
    if (existingUser) {
      return res.send(
        "Username already exists. Please choose a different username"
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create a new user
    const newUser = new User({
      username: data.name,
      password: hashedPassword,
    });

    const addedUser = await newUser.save();

    delete addedUser.hashedPassword;

    res.redirect("/users/login");
  } catch (err) {
    res.redirect("/signup");
  }
};

// Login Page
const login = (req, res) => {
  const { error, logout } = req.query;
  res.render("auth/login", {
    pageTitle: "Login - Channel Cluster",
    error,
    logout,
  });
};

const loginLogic = async (req, res) => {
  try {
    const check = await User.findOne({ username: req.body.username });
    if (!check) {
      return res.redirect("/users/login?error=1");
    }
    // compare the has password from the database with the plain text
    const isPsswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (isPsswordMatch) {
      // Store the username in the session
      req.session.username = req.body.username;
      res.cookie("userCookie", req.body.username, {
        httpOnly: true,
        maxAge: 60000 * 60 * 6, // 6hr
      });

      res.redirect("/messages");
    } else {
      res.redirect("/users/login?error=1");
      // res.status(401).send("Wrong password");
    }
  } catch (err) {
    res.redirect("/users/login?error=1");
    // res.status(500).json({ message: err.message });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.clearCookie("userCookie");
    res.redirect("/users/login?logout=success");
  });
};

module.exports = {
  signup,
  signupLogic,
  login,
  loginLogic,
  logout,
};
