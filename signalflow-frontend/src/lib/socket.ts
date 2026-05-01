import { io, Socket } from "socket.io-client";

let socket: Socket;

export const connectSocket = () => {
  if (!socket) {
    const URL = process.env.NEXT_PUBLIC_API_URL as string;

    socket = io(URL, {
      withCredentials: true, // safe for production
    });
  }
};

export const getSocket = () => socket;