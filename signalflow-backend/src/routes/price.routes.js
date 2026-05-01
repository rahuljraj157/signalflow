const express = require("express");
const router = express.Router();
const redis = require("../config/redis"); // your redis config

router.get("/prices", async (req, res) => {
  try {
    const btc = await redis.get("BTC");
    const eth = await redis.get("ETH");
    const nifty = await redis.get("NIFTY50");

    res.json({
      BTC: Number(btc),
      ETH: Number(eth),
      NIFTY50: Number(nifty),
    });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching prices" });
  }
});

module.exports = router;