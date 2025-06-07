const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Dummy data — database ki jagah
const purchasedCourses = [
  { email: "student1@example.com", courseId: "dsa-course" },
  { email: "student2@example.com", courseId: "web-dev" }
];

// /api/check-access endpoint
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

// (Optional) Agar webhook bhi chahiye to rehne do, warna hata do
app.post('/api/webhook', (req, res) => {
  const { email, courseId } = req.body;

  const found = purchasedCourses.find(
    (entry) => entry.email === email && entry.courseId === courseId
  );

  if (found) {
    return res.json({ access: true });
  } else {
    return res.json({ access: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
