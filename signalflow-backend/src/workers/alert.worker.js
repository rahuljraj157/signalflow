
const { Worker } = require("bullmq");
const Redis = require("ioredis");
const AlertLog = require("../models/AlertLog");
const { getIO } = require("../sockets/socket");


const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "alert-queue",
  async (job) => {
    const { ruleId, price } = job.data;

    console.log("Processing alert:", ruleId);

    try {
      const numericPrice = Number(price);

      await AlertLog.create({
        ruleId,
        triggeredPrice: numericPrice,
      });

      const io = getIO();

      
      io.emit("alert-triggered", {
        ruleId,
        price: numericPrice,
      });

    } catch (err) {
      console.error("Worker error:", err);
    }
  },
  {
    connection,
  }
);

module.exports = worker;