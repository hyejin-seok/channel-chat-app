// Import required modules
require("dotenv").config();
const express = require("express");
const http = require("http");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { socketIoHandler } = require("./socketServer");
const path = require("path");

const app = express();
const server = http.createServer(app);
const sercureKey = "KeyForCookieParsing";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(sercureKey));
app.use(express.static("public"));

// Set up session middleware
app.use(
  session({
    secret: "sercretKeyForSessionIdCookie",
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware to capitalize first letter of username
app.use((req, res, next) => {
  if (req.session.username) {
    const username =
      req.session.username.charAt(0).toUpperCase() +
      req.session.username.slice(1);
    res.locals.username = username;
  }
  next();
});

// Middleware for user authentication
const authenticateUser = (req, res, next) => {
  if (!req.session.username) {
    return res.redirect("/users/login");
  }
  if (req.cookies.userCookie) {
    return next();
  }
  res.redirect("/users/login");
};

// Define routes
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");

app.get("/", authenticateUser, (req, res) => {
  res.render("chatRoom", {
    pageTitle: "Channel Cluster",
  });
});

app.use("/users", userRoutes);
app.use("/messages", authenticateUser, messageRoutes);
app.use("/rooms", authenticateUser, roomRoutes);

// 404 error handler
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Initialize socket server
socketIoHandler(server);

// Set up server to listen on port
const port = process.env.PORT || 3007;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
