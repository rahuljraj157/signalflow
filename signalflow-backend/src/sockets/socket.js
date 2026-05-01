let io;

const initSocket = (server) => {
  const socketIo = require("socket.io");

  io = socketIo(server, {
    cors: {
  origin: "https://signalflow-vert.vercel.app",
  methods: ["GET", "POST"],
  credentials: true,
},
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket not initialized");
  }
  return io;
};

module.exports = { initSocket, getIO };