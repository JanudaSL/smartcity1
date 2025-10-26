import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [welcome, setWelcome] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));

    // optional: verify token with backend protected endpoint
    (async () => {
      try {
        const res = await api.get("/protected");
        setWelcome(res.data.message || "Welcome!");
      } catch {
        // token may be invalid/expired — redirect handled by ProtectedRoute
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header title="SmartCity Reporter" />
      <main className="p-6">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
          <p className="text-gray-600 mb-4">{welcome}</p>

          {user && (
            <div className="flex items-center gap-4">
              {user.avatar && <img src={user.avatar} alt="avatar" className="w-16 h-16 rounded-full" />}
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="text-sm text-gray-700">Now you can use the app features: report issues, view city leaderboard, and track status.</p>
            <div className="mt-4">
              <button className="bg-cyan-500 text-white px-4 py-2 rounded">Create Report (coming)</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
