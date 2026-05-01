const AlertRule = require("../models/AlertRule");


exports.createRule = async (req, res) => {
  try {
    const { assetSymbol, condition, targetPrice } = req.body;

    
    if (!assetSymbol || !condition) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    if (targetPrice === undefined || isNaN(targetPrice)) {
      return res.status(400).json({ msg: "Invalid price" });
    }

    if (Number(targetPrice) <= 0) {
      return res.status(400).json({ msg: "Price must be greater than 0" });
    }

    if (!["GREATER_THAN", "LESS_THAN"].includes(condition)) {
      return res.status(400).json({ msg: "Invalid condition" });
    }

  
    const rule = await AlertRule.create({
      userId: req.user.id,
      assetSymbol,
      condition,
      targetPrice: Number(targetPrice),
      status: "active", 
    });

    res.status(201).json(rule);

  } catch (err) {
    console.error("Create Rule Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.getRules = async (req, res) => {
  try {
    const rules = await AlertRule.find({ userId: req.user.id });
    res.json(rules);
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.updateRule = async (req, res) => {
  try {
    const rule = await AlertRule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(rule);
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.deleteRule = async (req, res) => {
  try {
    await AlertRule.findByIdAndDelete(req.params.id);
    res.json({ msg: "Rule deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};