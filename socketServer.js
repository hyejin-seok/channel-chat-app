// const socketIO = require("socket.io");

// const initSocketServer = (server) => {
//   const io = socketIO(server);

//   io.on("connection", (socket) => {
//     console.log("A user has connected");

//     socket.on("disconnect", () => {
//       console.log("User disconnected");
//     });

//     // JOIN room
//     socket.on("join room", (data) => {
//       //Listen for the 'join room' event.
//       socket.join(data.room);
//       console.log(`${data.user} joined ${data.room}`);
//       socket.username = data.user;

//       // Send message to all clients in room
//       io.to(data.room).emit("chat message", {
//         msg: `${data.user} has joined the room`,
//         user: "System", // indicating that the message is coming from the system or server rather than a specific user. (common convention)
//         room: data.room,
//       });
//     });

//     // LEAVE room
//     socket.on("leave room", (room) => {
//       socket.leave(room);
//       console.log(`${socket.username} has left ${room}`);

//       // Send message to all clients in room
//       io.to(room).emit("chat message", {
//         msg: `${socket.username} has left the room`,
//         user: "System",
//         room: room,
//       });

//       console.log("Leave room event emitted");
//     });

//     socket.on("chat message", (data) => {
//       io.emit("chat message", {
//         msg: data.msg,
//         user: data.user,
//         room: data.room,
//       }); // Sending this to all connected clients
//     });
//   });
// };

// module.exports = initSocketServer;
