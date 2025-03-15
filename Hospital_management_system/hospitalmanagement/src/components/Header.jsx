import React from "react";
import { hospitalLogo, smallLogo } from "../assets/images/Index.jsx";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

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
      <header className="h-[80px] fixed w-full flex justify-between bg-gradient-to-tr from-[#ffffff] to-[#0098B9] py-[25px] px-4 ">
        <div className="flex">
          <a className="w-[100px] md:w-[200px]">
            <img src={hospitalLogo} alt="hospitalname" />
          </a>
          <a className="w-[20px] md:w-[50px]">
            <img src={smallLogo} alt="log" />
          </a>
        </div>
        <div className="text-white flex gap-[50px] text-xl">
          <NavLink
            to="/Home"
            className={({ isActive }) =>
              `px-4 rounded hidden md:block ${
                isActive ? "border-2 border-white bg-[#007a99]" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/Book_appointment"
            className={({ isActive }) =>
              `px-4 rounded hidden md:block ${
                isActive ? "border-2 border-white bg-[#007a99]" : ""
              }`
            }
          >
            Book Appointment
          </NavLink>
          <NavLink
            to="/History"
            className={({ isActive }) =>
              `px-4 rounded hidden md:block ${
                isActive ? "border-2 border-white bg-[#007a99]" : ""
              }`
            }
          >
            Appointment History
          </NavLink>
          <NavLink
            to="/Profile"
            className={({ isActive }) =>
              `px-4 rounded hidden md:block ${
                isActive ? "border-2 border-white bg-[#007a99]" : ""
              }`
            }
          >
            Profile
          </NavLink>
          
          <button
            onClick={handleLogout}
            className="px-4 rounded  md:block bg-red-500 hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        
      </header>
      <div className="fixed bottom-4 right-4 md:hidden">
        <button
          onClick={() => navigate('/Home')}
          className="bg-[#007a99] text-white px-4 py-2 mb-[400px] rounded-lg shadow-md hover:bg-[#005f73]"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Header;
