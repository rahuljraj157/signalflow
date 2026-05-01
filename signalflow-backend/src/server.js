require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const startTicker = require("./services/ticker.service");
const startScheduler = require("./workers/scheduler");
require("./workers/alert.worker");

const http = require("http");
const { initSocket } = require("./sockets/socket");


connectDB();


startTicker();
startScheduler();

const PORT = process.env.PORT || 5000;


const server = http.createServer(app);


initSocket(server);


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
