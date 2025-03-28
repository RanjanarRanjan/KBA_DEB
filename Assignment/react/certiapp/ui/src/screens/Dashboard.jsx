import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import image from "../assets/image.png";

const Dashboard = () => {
  const [certiId, setCertiId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Add navigation hook

  const handleSearch = async () => {
    if (!certiId.trim()) {
      setError("Please enter a certificate ID.");
      return;
    }

    setError(""); // Clear previous errors

    try {
      const response = await fetch(`/api/getcerti?certi_id=${certiId}`);
      const data = await response.json();

      if (response.ok) {
        navigate("/view", { state: { certiData: data } }); // Navigate to View page
      } else {
        setError(data || "Certificate not found.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <Nav />
      <div className="flex flex-col text-center items-center">
        <h1 className="my-12 text-3xl">Certificate Dapp</h1>
        <img src={image} alt="logo" className="w-52" />
        
        <div className="flex my-6 gap-2">
          <input
            className="w-full px-2 min-h-8 bg-white ring-2 ring-sky-400 pl-1 placeholder:text-sm"
            type="text"
            placeholder="Enter certificate ID to View"
            value={certiId}
            onChange={(e) => setCertiId(e.target.value)}
          />
          <button
            className="bg-sky-400 text-white text-sm px-4 py-1 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Dashboard;
