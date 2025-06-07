const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// 🔔 Webhook endpoint
app.post("/webhook", (req, res) => {
  const data = req.body;
  console.log("Webhook received:", data);
  // Validate and respond accordingly
  res.status(200).send("Webhook received");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
