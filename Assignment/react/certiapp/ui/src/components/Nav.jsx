import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "GET", credentials: "include" });

      if (response.ok) {
        navigate("/"); // Redirect to login page after logout
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-5 mt-2.5 shadow-md flex justify-between items-center">
      <div className="flex gap-4">
        <Link
          to="/dashboard"
          className={`px-4 py-2 text-center rounded-md transition ${
            location.pathname === "/dashboard"
              ? "bg-sky-500 text-white"
              : "text-sky-600 hover:underline hover:text-sky-800"
          }`}
        >
          Home
        </Link>
        <Link
          to="/certificate"
          className={`px-4 py-2 text-center rounded-md transition ${
            location.pathname === "/certificate"
              ? "bg-sky-500 text-white"
              : "text-sky-600 hover:underline hover:text-sky-800"
          }`}
        >
          Certificate
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Nav;
