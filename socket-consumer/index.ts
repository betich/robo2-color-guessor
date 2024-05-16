import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  server_says_hi: (data: SocketData) => void;
  color: (color: string) => void;
}

interface ClientToServerEvents {
  hello: () => void;
  say_hi: (arg: string, callback: (response: string) => void) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  message: string;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io("ws://0.0.0.0:8080");

socket.on("connect", () => {
  console.log("connected");
});

// say hi
socket.emit("hello");

socket.emit("say_hi", "world", (response) => {
  console.log(response); // "got it"
});

socket.on("server_says_hi", (data) => {
  console.log(data.message); // "hi"
});
