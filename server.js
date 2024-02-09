require("dotenv").config();

const express = require("express");
const http = require("http");
const initSocketServer = require("./socketServer");

const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const server = http.createServer(app);

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

initSocketServer(server);

const port = process.env.PORT || 3007;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
