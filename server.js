require("dotenv").config();

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({ detended: false }));

app.get("/", (req, res) => {
  res.render("index", { pageTitle: "Home-Chatroom" });
});

app.use("/messages", messageRoutes);
app.use("/users", userRoutes);

io.on("connection", (socket) => {
  console.log("A user has connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Join room
  socket.on("join room", (data) => {
    socket.join(data.room);
    console.log(`${data.user} joined ${data.room}`);
    socket.username = data.user;

    // Send message to all clients in room
    io.to(data.room).emit("chat message", {
      msg: `${data.user} has joined the room`,
      user: "System",
      room: data.room,
    });
  });

  // Leave room
  socket.on("leave room", (room) => {
    socket.leave(room);
    console.log(`${socket.username} has left ${room}`);

    // Send message to all clients in room
    io.to(room).emit("chat message", {
      msg: `${socket.username} has left the room`,
      user: "System",
      room: room,
    });
  });

  socket.on("chat message", (data) => {
    // data is from the client
    io.emit("chat message", {
      msg: data.msg,
      user: data.user,
      room: data.room,
    }); // Sending this to all connected clients
  });
});

const port = process.env.port || 3009;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
