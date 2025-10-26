import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ title }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-cyan-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div>
        <button className="bg-white text-cyan-600 px-3 py-1 rounded" onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button className="ml-2 bg-white text-cyan-600 px-3 py-1 rounded" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}
