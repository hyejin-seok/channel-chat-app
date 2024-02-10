require("dotenv").config();

const express = require("express");
const http = require("http");
const session = require("express-session");
const initSocketServer = require("./socketServer");
const path = require("path");

const app = express();
const server = http.createServer(app);

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); // middleware to parse incoming requests with URL-encoded payloads.
// Set up session middleware
app.use(
  session({
    secret: "kalsjdfajdsjf", // Change this to a random string (used to sign the session ID cookie)
    resave: false, // Avoids saving session if not modified
    saveUninitialized: false, // Avoids creating sessions for unauthenticated users
    // Other options...
  })
);

const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");

app.set("views", path.join(__dirname, "views"));

// Middleware to pass username session to routes
// app.use((req, res, next) => {
//   res.locals.username = req.session.username;
//   next();
// });

// Middleware to check if user is authenticated
const authenticateUser = (req, res, next) => {
  if (!req.session.username) {
    return res.redirect("/users/login"); // Redirect to login page if user is not authenticated
  }
  next(); // Proceed to the next middleware or route handler
};

app.get("/", authenticateUser, (req, res) => {
  console.log("Username in session:", req.session.username);
  res.render("index", {
    pageTitle: "Home-Chatroom",
    username: req.session.username,
  });
  // res.render("auth/login", { pageTitle: "Login" });
});

app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

// Catch-all route for invalid requests
app.use((req, res) => {
  res.status(404).send("Page not found");
});

initSocketServer(server);

const port = process.env.PORT || 3007;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
