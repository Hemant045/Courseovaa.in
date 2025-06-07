const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // Yeh zaroori hai webhook data read karne ke liye

// Dummy in-memory "database"
const purchasedCourses = [
  { email: "student1@example.com", courseId: "dsa-course" },
  { email: "student2@example.com", courseId: "web-dev" }
];

// ✅ Access check endpoint for frontend
app.post('/api/check-access', (req, res) => {
  const { email, courseId } = req.body;

  const found = purchasedCourses.find(
    (entry) => entry.email === email && entry.courseId === courseId
  );

  if (found) {
    return res.json({ accessGranted: true });
  } else {
    return res.json({ accessGranted: false });
  }
});

// ✅ Webhook endpoint for Cashfree (to store successful purchase)
app.post('/api/webhook', (req, res) => {
  const event = req.body;
  console.log("📩 Webhook Received:", event);

  if (event.txStatus === "SUCCESS") {
    const email = event.customerEmail;
    const courseId = event.orderId;

    const alreadyPurchased = purchasedCourses.find(
      (entry) => entry.email === email && entry.courseId === courseId
    );

    if (!alreadyPurchased) {
      purchasedCourses.push({ email, courseId });
      console.log(`✅ Purchase added for ${email} - ${courseId} via webhook`);
    }

    return res.status(200).json({ success: true });
  }

  return res.status(200).json({ access: false }); // fail case
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
