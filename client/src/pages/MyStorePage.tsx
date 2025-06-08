import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import axios from 'axios';

interface Purchase {
  courseId: string;
  email: string;
}

const MyStorePage = () => {
  const [user] = useAuthState(auth);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await axios.post("https://your-backend-url.onrender.com/api/user-purchases", {
          email: user?.email,
        });

        setPurchases(res.data.purchases || []);
      } catch (err) {
        console.error("Error fetching purchases:", err);
      }
    };

    if (user?.email) {
      fetchPurchases();
    }
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">🛒 My Purchases</h2>
      {purchases.length > 0 ? (
        <ul className="space-y-3">
          {purchases.map((item, index) => (
            <li key={index} className="border p-4 rounded shadow">
              ✅ You purchased: <strong>{item.courseId}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p>No purchases found for this account.</p>
      )}
    </div>
  );
};

export default MyStorePage;
