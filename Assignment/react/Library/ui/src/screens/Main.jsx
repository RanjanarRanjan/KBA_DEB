import React from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../assets/image1.png";
import  image2  from "../assets/image2.png";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#daf0ef]">
      <h1 className="text-4xl font-bold text-[#03615C] mb-10">Welcome to LibraryWorld</h1>

      <div className="flex flex-col sm:flex-row gap-8">
        {/* Admin Login */}
        <div
          className="w-[300px] bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer hover:shadow-2xl transition"
          onClick={() => navigate("/Login")}
        >
          <img
            src={image1}
            alt="Admin Login"
            className="w-28 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800">Admin Login</h2>
          <p className="text-gray-600 mt-2">Manage books, users, and more.</p>
        </div>

        {/* Explore Library */}
        <div
          className="w-[300px] bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer hover:shadow-2xl transition"
          onClick={() => navigate("/dashboard")}
        >
          <img
            src={image2}
            alt="Explore Library"
            className="w-28 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800">Explore Library</h2>
          <p className="text-gray-600 mt-2">View books & start exploring.</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
