import { useState } from "react";
import axios from "axios";

export default function EnrollForm() {
  const [userId, setUserId] = useState("");
  const [activityType, setActivityType] = useState("referral");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId.trim()) {
      setError("Please enter a User ID.");
      setResult(null);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/enroll`, {
        userId,
        activityType,
      });
      setResult(res.data);
      setError("");
    } catch (err) {
      setResult(null);
      setError("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-xl w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Enroll Activity</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <select
          className="w-full border p-2 rounded"
          value={activityType}
          onChange={(e) => setActivityType(e.target.value)}
        >
          <option value="referral">Referral</option>
          <option value="post">Post</option>
          <option value="tech_module">Tech Module</option>
          <option value="spend">Spend</option>
          <option value="coffee_wall">Coffee Wall</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>

      {result && (
        <div className="mt-4 text-sm text-gray-700">
          <p><strong>Credits Awarded:</strong> {result.creditsAwarded}</p>
          <p><strong>Total Credits:</strong> {result.totalCredits}</p>
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
