// const messageRoutes = require("./routes/messageRoutes");

document.addEventListener("DOMContentLoaded", function () {
  const socket = io();
  const form = document.querySelector("#form");
  const input = document.querySelector("#input");
  const messagesContainer = document.querySelector("#messages");
  let currentRoom = "";

  input.disabled = true;
  form.querySelector("button").disabled = true;

  const addMessagesToChatRoom = async (roomId) => {
    const response = await fetch(`http://localhost:3007/messages/${roomId}`);
    const messages = await response.json();
    console.log(">>> all messages of this room:", messages);
    messages.map((message) => {
      const { sender, text } = message;
      messagesContainer.insertAdjacentHTML(
        "beforeend",
        `
        <li>
          <strong>${sender}</strong>: ${text}
        </li>
      `
      );
    });
  };

  // roomId, user (1send...client -> server)
  function joinRoom(roomId) {
    currentRoom = roomId;
    addMessagesToChatRoom(roomId);
    socket.emit("join room", { room: roomId, user: username });
  }

  function leaveRoom() {
    if (currentRoom) {
      console.log(">>> leave room??");
      socket.emit("leave room", currentRoom);
      currentRoom = "";

      // Maybe need maybe not??
      messagesContainer.innerHTML = "";
    }
  }

  // msg, user, roomId (서버로 보내는 것들)
  form.addEventListener("submit", function (e) {
    console.log(">>> send message");
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

  // msg, user, roomId
  socket.on("chat message", function (data) {
    if (data.room === currentRoom) {
      const item = document.createElement("li");
      item.textContent = `${data.user}: ${data.msg}`;
      console.log(">>> here", data.room);
      console.log(">>>here2(data is>>)", data);
      messagesContainer.appendChild(item);
    }
  });

  // Handle chat history event
  // socket.on("chat history", function (messages) {
  //   messages.forEach((message) => {
  //     const item = document.createElement("li");
  //     item.textContent = `${message.sender.username}: ${message.message.text}`;
  //     messages.appendChild(item);
  //   });
  // });

  const getRooms = async () => {
    const response = await fetch("http://localhost:3007/rooms");
    const rooms = await response.json();
    return rooms;
  };

  getRooms().then((allRooms) => {
    // console.log(">>> allRooms", allRooms);
    allRooms.forEach((room) => {
      document.querySelector(".room-wrapper").insertAdjacentHTML(
        "beforeend",
        `<button class="room" value="${room._id}">${room.name}</button>`
        // `<a class="room" href="/messages/${room._id}" value="${room._id}">${room.name}</a>`
      );
    });

    // await axios.post("http://localhost:3007/messages", {
    //   sender: data._id,
    //   room: currentChat._id,
    //   text: msg,
    // });

    const roomButtons = document.querySelectorAll(".room");
    roomButtons.forEach((roomButton) => {
      roomButton.addEventListener("click", function () {
        // Logic to handle room selection
        const roomId = this.value; // Get the room name from button text
        console.log(">>> room value", roomId);
        if (roomId) {
          input.disabled = false;
          form.querySelector("button").disabled = false;
          leaveRoom();
          joinRoom(roomId);
        } else {
          input.disabled = true;
          form.querySelector("button").disabled = true;
          leaveRoom();
        }
      });
    });
  });
});
