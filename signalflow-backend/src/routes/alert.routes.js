const express = require("express");
const router = express.Router();
const AlertLog = require("../models/AlertLog");
const auth = require("../middleware/auth.middleware.js");

router.get("/alerts", auth, async (req, res) => {
  try {
    const logs = await AlertLog.find()
      .populate({
        path: "ruleId",
        match: { userId: req.user.id },
      })
      .sort({ createdAt: -1 });

    const filtered = logs.filter((log) => log.ruleId);

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching logs" });
  }
});

module.exports = router;