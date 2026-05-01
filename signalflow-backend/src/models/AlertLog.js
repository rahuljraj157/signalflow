const mongoose = require("mongoose");

const alertLogSchema = new mongoose.Schema({
  ruleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AlertRule",
  },
  triggeredPrice: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AlertLog", alertLogSchema);