document.addEventListener("DOMContentLoaded", function () {
  // Constants and variables
  const domain = "http://localhost:3007";
  const socket = io();
  const form = document.querySelector("#form");
  const input = document.querySelector("#input");
  const messagesContainer = document.querySelector("#messages");
  const chatHeader = document.querySelector("#chat-header");
  let currentRoomId = "";

  // Fetch rooms and update UI
  const getRooms = async () => {
    const response = await fetch(`${domain}/rooms`);
    const rooms = await response.json();
    return rooms;
  };

  getRooms().then((allRooms) => {
    allRooms.forEach((room) => {
      document
        .querySelector(".room-wrapper")
        .insertAdjacentHTML(
          "beforeend",
          `<button class="room" value="${room._id}">${room.name}</button>`
        );
    });

    updateUI(null);

    // Add event listeners to room buttons
    const roomButtons = document.querySelectorAll(".room");
    roomButtons.forEach((roomButton) => {
      roomButton.addEventListener("click", function () {
        const roomId = this.value;
        const buttonText = this.textContent;
        if (roomId) {
          leaveRoom();
          joinRoom(roomId, buttonText);
          updateUI(roomId);
        } else {
          leaveRoom();
          updateUI(null);
        }
      });
    });
  });

  // Join a room
  function joinRoom(roomId, roomName) {
    currentRoomId = roomId;
    addMessagesToChatRoom(roomId, roomName);
    socket.emit("join room", {
      room: roomId,
      user: username,
    });
  }

  // Leave the current room
  function leaveRoom() {
    if (currentRoomId) {
      socket.emit("leave room", currentRoomId);
      currentRoomId = "";
      messagesContainer.innerHTML = "";
    }
  }

  // Update UI based on room selection
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

  // Fetch messages for a room
  const addMessagesToChatRoom = async (roomId, roomName) => {
    const response = await fetch(`${domain}/messages/${roomId}`);
    const messages = await response.json();

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

  // Submit message form
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (input.value && username) {
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

  // Receive and display chat messages
  socket.on("chat message", function (data) {
    if (data.room === currentRoomId) {
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
