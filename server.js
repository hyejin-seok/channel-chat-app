require("dotenv").config();

const express = require("express");
const http = require("http");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const initSocketServer = require("./socketServer");
const path = require("path");

const app = express();
const server = http.createServer(app);
const sercureKey = "adfqef1233afdgadf";

app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser(sercureKey));
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false })); // middleware to parse incoming requests with URL-encoded payloads.
// Set up session middleware
app.use(
  session({
    secret: "kalsjdfajdsjf", // Change this to a random string (used to sign the session ID cookie)
    resave: false, // Avoids saving session if not modified
    saveUninitialized: false, // Avoids creating sessions for unauthenticated users
  })
);

const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");

app.set("views", path.join(__dirname, "views"));

// Middleware to pass username session to routes
app.use((req, res, next) => {
  if (req.session.username) {
    // Capitalize the first letter of the username
    const username =
      req.session.username.charAt(0).toUpperCase() +
      req.session.username.slice(1);
    res.locals.username = username;
  }
  next();
});

// Middleware to check if user is authenticated
// const authenticateUser = (req, res, next) => {
//   if (!req.session.username) {
//     return res.redirect("/users/login");
//   }
//   if (req.cookies.userCookie) {
//     return next();
//   }
//   if (req.path === "/users/login") {
//     return next();
//   }
//   res.redirect("/users/login");
// };

// Middleware to check if user is authenticated
const authenticateUser = (req, res, next) => {
  if (!req.session.username) {
    return res.redirect("/users/login"); // Redirect to login page if user is not authenticated
  }
  if (req.cookies.userCookie) {
    return next(); // User is authenticated (Proceed to the next middleware or route handler)
  }
  // If user is authenticated but doesn't have the userCookie, redirect to login page
  res.redirect("/users/login");
};

app.get("/", authenticateUser, (req, res) => {
  // console.log("Username in session:", req.session.username);
  res.render("chatRoom", {
    pageTitle: "Channel Cluster",
    // username: req.session.username,
  });
  // res.render("auth/login", { pageTitle: "Login" });
});

app.use("/users", userRoutes);
app.use("/messages", authenticateUser, messageRoutes);
app.use("/rooms", authenticateUser, roomRoutes);

// Catch-all route for invalid requests
app.use((req, res) => {
  res.status(404).send("Page not found");
});

initSocketServer(server);

const port = process.env.PORT || 3007;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
