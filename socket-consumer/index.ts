import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  server_says_hi: (data: SocketData) => void;
  detect_color: (data: { data: string[] }) => void;
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

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:8080"
);

socket.on("connect", () => {
  console.log("connected");
});

socket.on("disconnect", () => {
  console.log("disconnected");
});

const listener = (eventName: string, ...args: any) => {
  console.log(eventName, args);
};

socket.onAnyOutgoing(listener);

// say hi
socket.on("server_says_hi", (data) => {
  console.log(data.message); // "hi"
});

// color
socket.on("detect_color", (data) => {
  console.log(data.data); // ["red", "blue", "green"]
});

socket.onAny(() => {
  // not triggered when the acknowledgement is received
  console.log("hi");
});

socket.on;
