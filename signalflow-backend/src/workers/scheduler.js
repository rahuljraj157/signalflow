const evaluateRules = require("../services/ruleEvaluator");

const startScheduler = () => {
  setInterval(async () => {
    await evaluateRules();
  }, 5000);
};

module.exports = startScheduler;