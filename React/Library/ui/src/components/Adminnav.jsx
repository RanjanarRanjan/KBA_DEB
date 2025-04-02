import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Adminnav = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Logout failed:", data.msg);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <div className="absolute">
        <div className="flex flex-col bg-[#03615C] text-white font-[cursive] mt-14 text-[15px] px-[20px] pl-[30px] justify-evenly h-screen fixed">
          <Link
            to="/dashboard"
            className={`py-2 ${location.pathname === "/dashboard" ? "font-bold text-yellow-300" : ""}`}
          >
            Books
          </Link>
          <Link
            to="/managebook"
            className={`py-2 ${location.pathname === "/managebook" ? "font-bold text-yellow-300" : ""}`}
          >
            Manage Books
          </Link>
          <Link
            to="/addbook"
            className={`py-2 ${location.pathname === "/addbook" ? "font-bold text-yellow-300" : ""}`}
          >
            Add Book
          </Link>
          <button
            onClick={handleLogout}
            
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Adminnav;
