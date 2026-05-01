const { Queue } = require("bullmq");
const Redis = require("ioredis");


const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

const alertQueue = new Queue("alert-queue", {
  connection,
});

module.exports = alertQueue;