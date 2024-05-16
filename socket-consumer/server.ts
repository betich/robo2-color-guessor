import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

io.on("hihi", (socket) => {
  console.log("hi", socket);
});

const port = 5003;

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
