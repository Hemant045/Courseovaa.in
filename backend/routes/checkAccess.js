// backend/routes/checkAccess.js

const express = require("express");
const router = express.Router();

router.post("/check-access", (req, res) => {
  const { email, courseId } = req.body;

  if (!email || !courseId) {
    return res.status(400).json({ accessGranted: false });
  }

  // Yahan database ya kisi aur service se check karen ki user ko course ka access hai ya nahi
  const userHasAccess = true; // Yeh logic aapke use case ke hisaab se hoga

  res.json({ accessGranted: userHasAccess });
});

module.exports = router;
