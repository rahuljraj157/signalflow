const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const ruleRoutes=require("./routes/rule.routes")
const priceRoutes = require("./routes/price.routes");
const alertRoutes = require("./routes/alert.routes");


const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/rules", ruleRoutes);
app.use("/api", priceRoutes);
app.use("/api", alertRoutes);



app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;