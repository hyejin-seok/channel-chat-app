require("dotenv").config();

const express = require("express");
// const mongoose = require("mongoose");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");

app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
app.use(express.json());
// app.use(express.urlencoded({ detended: false }));
app.use(express.static("public"));

// mongoose
//   .connect(process.env.DATABASE_URL)
//   .then(() => console.log("Database connected!"))
//   .catch((err) => console.error("Connection error:", err));

app.get("/", (req, res) => {
  res.render("index", { pageTitle: "Home-Chatroom" });
});

app.use("/messages", messageRoutes);
app.use("/users", userRoutes);

const port = process.env.port || 3009;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
