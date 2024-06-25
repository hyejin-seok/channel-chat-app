require("dotenv").config();
const express = require("express");
const http = require("http");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { socketIoHandler } = require("./socketServer");
const path = require("path");

const app = express();
const server = http.createServer(app);

const COOKIE_PARSING_SECRET_KEY = process.env.COOKIE_PARSING_SECRET_KEY;
const SESSION_ID_SECRET_KEY = process.env.SESSION_ID_SECRET_KEY;
const PORT = process.env.PORT || 3007;

const routes = require("./routes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_PARSING_SECRET_KEY));
app.use(express.static("public"));

// Set up session middleware
app.use(
  session({
    secret: SESSION_ID_SECRET_KEY,
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

app.use(routes);

// 404 error handler
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Connect to databases
connectDBs().then(({ chatDB, authDB }) => {
  socketIoHandler(server);

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Global error handlers
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception thrown:", err);
  process.exit(1);
});
