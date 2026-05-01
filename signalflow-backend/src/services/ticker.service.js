const redis = require("../config/redis");
const { getRandomPrice } = require("../utils/generatePrice");

const startTicker = () => {
  setInterval(async () => {
    const prices = {
      BTC: getRandomPrice(60000, 80000),
      ETH: getRandomPrice(2000, 4000),
      NIFTY50: getRandomPrice(20000, 23000),
    };

    for (let key in prices) {
      await redis.set(key, prices[key]);
    }

    console.log("Updated Prices:", prices);
  }, 5000);
};

module.exports = startTicker;