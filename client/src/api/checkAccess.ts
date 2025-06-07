export async function checkAccess(email: string, courseId: string) {
  try {
    const response = await fetch("https://courseovaa-in.onrender.com/api/check-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, courseId }),
    });

    if (!response.ok) throw new Error("Failed to fetch");

    const data = await response.json();
    return { accessGranted: data.accessGranted };
  } catch (error) {
    console.error(error);
    return { accessGranted: false };
  }
}
