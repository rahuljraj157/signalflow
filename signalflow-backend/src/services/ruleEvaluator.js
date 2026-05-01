
const AlertRule = require("../models/AlertRule");
const redis = require("../config/redis");
const alertQueue = require("../config/queue");

const evaluateRules = async () => {
  try {
   
    const rules = await AlertRule.find({ status: "active" });

    for (let rule of rules) {
      const price = await redis.get(rule.assetSymbol);

      if (!price) continue;

      const currentPrice = Number(price); 

      let triggered = false;

      if (
        rule.condition === "GREATER_THAN" &&
        currentPrice > rule.targetPrice
      ) {
        triggered = true;
      }

      if (
        rule.condition === "LESS_THAN" &&
        currentPrice < rule.targetPrice
      ) {
        triggered = true;
      }

      if (triggered) {
        console.log("Rule Triggered:", rule._id);

       
        rule.status = "triggered";
        await rule.save();

       
        await alertQueue.add("alert", {
          ruleId: rule._id,
          price: currentPrice,
        });
      }
    }
  } catch (err) {
    console.error("Rule evaluation error:", err);
  }
};

module.exports = evaluateRules;