// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Dummy data — jise tum baad me database se replace kar sakte ho
const purchasedCourses = [
  { email: "student1@example.com", courseId: "dsa-course" },
  { email: "student2@example.com", courseId: "web-dev" }
];

app.post('/api/webhook', (req, res) => {
  const { email, courseId } = req.body;

  const found = purchasedCourses.find(
    (entry) => entry.email === email && entry.courseId === courseId
  );

  if (found) {
    res.json({ access: true });
  } else {
    res.json({ access: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
