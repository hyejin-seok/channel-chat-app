// const messageRoutes = require("./routes/messageRoutes");

document.addEventListener("DOMContentLoaded", function () {
  const socket = io();
  const form = document.querySelector("#form");
  const input = document.querySelector("#input");
  const messages = document.querySelector("#messages");

  // const roomButtons = document.querySelectorAll(".room");

  let currentRoom = "";

  input.disabled = true;
  form.querySelector("button").disabled = true;

  // roomButtons.forEach((roomButton) => {
  //   roomButton.addEventListener("click", function () {
  //     // Logic to handle room selection
  //     const roomName = this.value; // Get the room name from button text
  //     console.log(">>> room value", roomName);
  //     if (roomName) {
  //       input.disabled = false;
  //       form.querySelector("button").disabled = false;
  //       leaveRoom();
  //       joinRoom(roomName);
  //     } else {
  //       input.disabled = true;
  //       form.querySelector("button").disabled = true;
  //       leaveRoom();
  //     }
  //   });
  // });

  // roomId, user (1send...client -> server)
  function joinRoom(newRoom) {
    currentRoom = newRoom;
    socket.emit("join room", { room: newRoom, user: username });
  }

  //     // Redirect the user to a different page
  //     window.location.href = "/messages/" + newRoom; // Redirect to a URL representing the room
  //     // window.location.replace(`/messages/${newRoom}`);
  //   }
  // });

  function leaveRoom() {
    if (currentRoom) {
      console.log(">>> leave room??");
      socket.emit("leave room", currentRoom);
      currentRoom = "";

      // Maybe need maybe not??
      messages.innerHTML = "";
    }
  }

  // msg, user, roomId (서버로 보내는 것들)
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

  // msg, user, roomId
  socket.on("chat message", function (data) {
    if (data.room === currentRoom) {
      const item = document.createElement("li");
      item.textContent = `${data.user}: ${data.msg}`;
      console.log(">>> here", data.room);
      console.log(">>>here2(data is>>)", data);
      messages.appendChild(item);
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
          // window.location.replace(`/messages/${roomId}`);
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
