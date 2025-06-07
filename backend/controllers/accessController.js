import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const handlePaymentVerification = (req, res) => {
  const { email, courseId } = req.body;

  const usersData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/users.json"))
  );

  const user = usersData.find(
    (u) => u.email === email && u.courseId === courseId
  );

  if (user) {
    return res.json({ success: true, message: "Access Granted" });
  } else {
    return res.json({ success: false, message: "Access Denied" });
  }
};