require("dotenv").config();

const express = require("express");
const http = require("http");
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

app.get("/", (req, res) => {
  res.render("index", { pageTitle: "Home-Chatroom" });
  // res.render("auth/login", { pageTitle: "Login" });
});

app.use("/users", userRoutes);
app.use("/messages", messageRoutes);

initSocketServer(server);

const port = process.env.PORT || 3007;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
