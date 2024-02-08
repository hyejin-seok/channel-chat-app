require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.set("view engine", ejs);
app.use(express.static(public));

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error("Connection error:", err));

app.get("/", (req, res) => {
  res.render("index");
});

const port = process.env.port || 3009;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
