import { useState } from "react";
import axios from "axios";

export default function GetCredits() {
  const [userId, setUserId] = useState("");
  const [credits, setCredits] = useState(null);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchCredits = async () => {
    if (!userId.trim()) {
      setError("Please enter a User ID.");
      setCredits(null);
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/api/credits/${userId}`);
      setCredits(res.data.totalCredits);
      setError("");
    } catch (err) {
      setCredits(null);
      setError("❌ Unable to fetch credits. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-xl w-full max-w-md mt-6">
      <h2 className="text-xl font-bold mb-4">Check Total Credits</h2>
      <input
        className="w-full border p-2 rounded mb-2"
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button
        onClick={fetchCredits}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Fetch Credits
      </button>

      {credits !== null && (
        <p className="mt-4 text-sm text-gray-700">
          <strong>Total Credits:</strong> {credits} 💰
        </p>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
