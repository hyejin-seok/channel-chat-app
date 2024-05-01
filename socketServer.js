const socketIO = require("socket.io");

const initSocketServer = (server) => {
  const io = socketIO(server);

  io.on("connection", (socket) => {
    console.log("A user has connected");

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

    // JOIN room
    socket.on("join room", async (data) => {
      console.log("what is data>>", data);

      socket.join(data.room);
      console.log(`${data.user} joined ${data.room}`);
      socket.username = data.user;
      // let __createdtime__ = Date.now();
    });

    // LEAVE room
    socket.on("leave room", (room) => {
      socket.leave(room);
      console.log(`${socket.username} has left ${room}`);
      console.log("Leave room event emitted");
    });

    socket.on("chat message", async (data) => {
      console.log("Received message:>>>", data);

      io.emit("chat message", {
        msg: data.msg,
        user: data.user,
        room: data.room,
      }); // Sending this to all connected clients
    });
  });
};

module.exports = initSocketServer;
