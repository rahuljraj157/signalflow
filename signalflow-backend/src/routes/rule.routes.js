const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const {
  createRule,
  getRules,
  updateRule,
  deleteRule,
} = require("../controllers/rule.controller");

router.post("/", auth, createRule);
router.get("/", auth, getRules);
router.put("/:id", auth, updateRule);
router.delete("/:id", auth, deleteRule);

module.exports = router;