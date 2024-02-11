const socketIO = require("socket.io");
const Message = require("./models/messageModel");

const initSocketServer = (server) => {
  const io = socketIO(server);

  io.on("connection", (socket) => {
    console.log("A user has connected");

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

    // JOIN room
    // roomId, user (2receive...client -> server)
    socket.on("join room", async (data) => {
      //Listen for the 'join room' event.
      socket.join(data.room);
      console.log(`${data.user} joined ${data.room}`);
      socket.username = data.user;
      // let __createdtime__ = Date.now();

      // Get all message
      const messages = await Message.find({ room: data.room });
      if (!messages) {
        return res.status(404).json({ message: "Item not found" });
      }
      console.log(">>> message here", messages);

      // Send message to all clients in room
      io.to(data.room).emit("chat message", {
        msg: `${data.user} has joined the ${data.room}`,
        user: "System",
        room: data.room,
      });
    });

    // LEAVE room
    socket.on("leave room", (room) => {
      socket.leave(room);
      console.log(`${socket.username} has left ${room}`);

      // Send message to all clients in room
      io.to(room).emit("chat message", {
        msg: `${socket.username} has left ${room}`,
        user: "System",
        room: room,
      });

      console.log("Leave room event emitted");
    });

    // msg, user, roomId
    socket.on("chat message", async (data) => {
      console.log("Received message:>>>", data);

      // Save the message to MongoDB
      try {
        const message = new Message({
          sender: data.user,
          room: data.room,
          text: data.msg,
        });
        await message.save();
        console.log("Message saved to the database");
      } catch (err) {
        console.error("Error saving message to database:", err);
      }

      io.emit("chat message", {
        msg: data.msg,
        user: data.user,
        room: data.room,
      }); // Sending this to all connected clients
    });
  });
};

module.exports = initSocketServer;
