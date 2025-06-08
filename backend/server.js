const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let purchasedCourses = [
  { email: "student1@example.com", courseId: "dsa-course" },
  { email: "student2@example.com", courseId: "web-dev" },
];

// ✅ Webhook: Add purchase entry
app.post("/api/webhook", (req, res) => {
  const { txStatus, customerEmail, orderId } = req.body;

  if (txStatus === "SUCCESS") {
    purchasedCourses.push({ email: customerEmail, courseId: orderId });
    console.log("✅ Purchase stored:", customerEmail, orderId);
    return res.json({ message: "Purchase stored" });
  }

  res.status(400).json({ message: "Invalid transaction" });
});

// ✅ User Purchase Check
app.post("/api/user-purchases", (req, res) => {
  const { email } = req.body;

  const userCourses = purchasedCourses.filter(item => item.email === email);
  return res.json({ purchases: userCourses });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
