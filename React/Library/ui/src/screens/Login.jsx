import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Buecher from "../assets/Buecher-coloured.svg";
import userIcon from "../assets/user.svg";
import passwordIcon from "../assets/password.svg";
import bgImage from "../assets/image.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null); 
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: email, password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        navigate("/dashboard"); // Redirect to admin dashboard
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Server error, please try again.");
    }
  };

  return (
    <div className="flex justify-center h-screen bg-[#daf0ef] pt-[30px]">
      <div
        className="w-[90%] h-[550px] bg-no-repeat bg-cover pt-10 flex justify-center rounded-lg"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="w-[600px] h-[450px] bg-[#daf0ef] m-5 rounded-lg px-5 pt-6 shadow-md">
          {/* Logo and Title */}
          <div className="flex items-center">
            <img src={Buecher} alt="logo" className="w-[50px]" />
            <div className="ml-6">
              <h4 className="text-[#03615C] text-[40px] font-[cursive]">
                LibraryWorld
              </h4>
              <p className="text-[15px] text-[#03615C] font-[cursive]">
                Having fun isn't hard when you've got a library card
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-6 mx-auto mt-6 w-[80%]">
            <div className="relative w-full">
              <img
                src={userIcon}
                alt="User Icon"
                className="absolute left-3 top-[50%] transform -translate-y-1/2 w-5 h-5"
              />
              <input
                className="w-full pl-[40px] p-2 border border-gray-300 rounded-md text-[18px] focus:outline-none focus:ring-2 focus:ring-[#03615C]"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative w-full">
              <img
                src={passwordIcon}
                alt="Password Icon"
                className="absolute left-3 top-[50%] transform -translate-y-1/2 w-5 h-5"
              />
              <input
                className="w-full pl-[40px] p-2 border border-gray-300 rounded-md text-[18px] focus:outline-none focus:ring-2 focus:ring-[#03615C]"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-600 text-center">{error}</p>}

            {/* Login Button */}
            <div className="flex justify-center">
              <button
                className="bg-[#03615C] w-[100px] rounded-md text-white text-center p-2 hover:bg-[#024A45]"
                onClick={handleLogin}
              >
                Login
              </button>
              <Link to="/"  className="bg-[#03615C] w-[100px] ml-[20px] rounded-md text-white text-center p-2 hover:bg-[#024A45]">Back</Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


