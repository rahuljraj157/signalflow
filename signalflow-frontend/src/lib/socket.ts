import { io, Socket } from "socket.io-client";

let socket: Socket;

export const connectSocket = () => {
  socket = io("http://localhost:5000");
};

export const getSocket = () => socket;