// const messageRoutes = require("./routes/messageRoutes");

document.addEventListener("DOMContentLoaded", function () {
  const domain = "http://localhost:3007";
  const socket = io();
  const form = document.querySelector("#form");
  const input = document.querySelector("#input");
  const messagesContainer = document.querySelector("#messages");
  const chatHeader = document.querySelector("#chat-header");
  let currentRoomId = "";

  const getRooms = async () => {
    const response = await fetch(`${domain}/rooms`);
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

    updateUI(null);

    const roomButtons = document.querySelectorAll(".room");
    roomButtons.forEach((roomButton) => {
      roomButton.addEventListener("click", function () {
        // Logic to handle room selection
        const roomId = this.value; // Get the room name from button text
        const buttonText = this.textContent;
        console.log(">>> room value", roomId);
        if (roomId) {
          input.disabled = false;
          form.querySelector("button").disabled = false;
          leaveRoom();
          joinRoom(roomId, buttonText);
          updateUI(roomId);
        } else {
          input.disabled = true;
          form.querySelector("button").disabled = true;
          leaveRoom();
          updateUI(null);
        }
      });
    });
  });

  // input.disabled = true;
  // form.querySelector("button").disabled = true;

  function joinRoom(roomId, roomName) {
    currentRoomId = roomId;
    addMessagesToChatRoom(roomId, roomName);
    socket.emit("join room", {
      room: roomId,
      user: username,
    });
  }

  function leaveRoom() {
    if (currentRoomId) {
      console.log(">>> leave room??");
      socket.emit("leave room", currentRoomId);
      currentRoomId = "";

      // Maybe need maybe not??
      messagesContainer.innerHTML = "";
    }
  }

  function updateUI(roomId) {
    const roomNotSelectedContent = document.getElementById(
      "room-not-selected-content"
    );
    const roomSelectedContent = document.getElementById(
      "room-selected-content"
    );

    if (!roomId) {
      roomNotSelectedContent.style.display = "flex";
      roomSelectedContent.style.display = "none";
    } else {
      roomNotSelectedContent.style.display = "none";
      roomSelectedContent.style.display = "grid";
    }
  }

  const addMessagesToChatRoom = async (roomId, roomName) => {
    const response = await fetch(`${domain}/messages/${roomId}`);
    const messages = await response.json();
    console.log(">>> all messages of this room:", messages);

    chatHeader.innerHTML = `<h2>&#10077;&nbsp;&nbsp;${roomName}&nbsp;&nbsp;&#10078;</h2>`;
    messages.map((message) => {
      const { sender, text } = message;
      const capitalizedSender =
        sender.charAt(0).toUpperCase() + sender.slice(1);
      messagesContainer.insertAdjacentHTML(
        "beforeend",
        `
        <li>
          <span>🪴 ${capitalizedSender}</span><br>
          &nbsp;${text} 
        </li>
      `
      );
    });
  };

  function joinRoom(roomId, roomName) {
    currentRoomId = roomId;
    addMessagesToChatRoom(roomId, roomName);
    socket.emit("join room", {
      room: roomId,
      user: username,
    });
  }

  function leaveRoom() {
    if (currentRoomId) {
      console.log(">>> leave room??");
      socket.emit("leave room", currentRoomId);
      currentRoomId = "";

      // Maybe need maybe not??
      messagesContainer.innerHTML = "";
    }
  }

  form.addEventListener("submit", async (e) => {
    console.log(">>> send message");
    e.preventDefault();
    if (input.value && username) {
      // save message
      try {
        const data = {
          username: username,
          room: currentRoomId,
          text: input.value,
        };
        const response = await fetch(`${domain}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Success:", result);

        // emit socket
        socket.emit("chat message", {
          msg: input.value,
          user: username,
          room: currentRoomId,
        });
        input.value = "";
      } catch (error) {
        console.error("Error:", error);
      }
    }
  });

  socket.on("chat message", function (data) {
    if (data.room === currentRoomId) {
      // const item = document.createElement("li");
      // item.textContent = `🪴 ${data.user}: ${data.msg}`;
      // console.log(">>> here", data.roome);
      // console.log(">>>here2(data is>>)", data);
      // messagesContainer.appendChild(item);

      const { user, msg } = data;
      const capitalizedUser = user.charAt(0).toUpperCase() + user.slice(1);
      messagesContainer.insertAdjacentHTML(
        "beforeend",
        `
        <li>
          <span>🪴 ${capitalizedUser}</span><br>
          &nbsp;${msg}
        </li>
      `
      );
    }
  });
});
