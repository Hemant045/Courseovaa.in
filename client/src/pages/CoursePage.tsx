import React from "react";
import { checkAccess } from "@/api/checkAccess";

const CoursePage = () => {
  const userEmail = "student1@example.com"; // Replace with actual logged-in user's email
  const courseId = "dsa-course"; // Replace based on course

  const handleAccess = async () => {
    const result = await checkAccess(userEmail, courseId);

    if (result.accessGranted) {
      // ✅ Show course content
      console.log("✅ Access granted");
    } else {
      // ❌ Show error / redirect
      console.log("⛔ Access denied");
    }
  };

  return (
    <div>
      <h1>DSA Course</h1>
      <button onClick={handleAccess} className="bg-blue-500 text-white px-4 py-2 rounded">
        View Course
      </button>
    </div>
  );
};

export default CoursePage;
