const mongoose = require("mongoose");

const alertRuleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  assetSymbol: {
    type: String, 
  },
  condition: {
    type: String, 
  },
  targetPrice: {
    type: Number,
  },
  status: {
    type: String,
    default: "active",
  },
});

module.exports = mongoose.model("AlertRule", alertRuleSchema);