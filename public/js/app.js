document.addEventListener("DOMContentLoaded", function () {
  const socket = io();
  const form = document.querySelector("#form");
  const input = document.querySelector("#input");
  const messages = document.querySelector("#messages");
  const roomButtons = document.querySelectorAll(".room");

  let currentRoom = "";

  input.disabled = true;
  form.querySelector("button").disabled = true;

  roomButtons.forEach((roomButton) => {
    roomButton.addEventListener("click", function () {
      // Logic to handle room selection
      const roomName = this.value; // Get the room name from button text
      if (roomName) {
        input.disabled = false;
        form.querySelector("button").disabled = false;
        leaveRoom();
        joinRoom(roomName);
      } else {
        input.disabled = true;
        form.querySelector("button").disabled = true;
        leaveRoom();
      }
    });
  });

  function joinRoom(newRoom) {
    currentRoom = newRoom;
    socket.emit("join room", { room: newRoom, user: username });
    messages.innerHTML = "";
  }

  function leaveRoom() {
    if (currentRoom) {
      socket.emit("leave room", currentRoom);
      currentRoom = "";
      messages.innerHTML = "";
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value && username) {
      socket.emit("chat message", {
        msg: input.value,
        user: username,
        room: currentRoom,
      });
      input.value = "";
    }
  });

  // data.msg data.user data.room
  socket.on("chat message", function (data) {
    if (data.room === currentRoom) {
      const item = document.createElement("li");
      item.textContent = `${username}: ${data.msg}`;
      console.log(">>> here");
      messages.appendChild(item);
    }
  });

  // Handle chat history event
  socket.on("chat history", function (messages) {
    messages.forEach((message) => {
      const item = document.createElement("li");
      item.textContent = `${message.sender.username}: ${message.message.text}`;
      messages.appendChild(item);
    });
  });
});
