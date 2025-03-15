import React from 'react';
import { useNavigate } from "react-router-dom";
import { hospitalLogo, smallLogo } from '../assets/images/Index.jsx';
import doctorImage from "../assets/images/sp-img.svg"; 

const Mainpage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full md:h-screen bg-gradient-to-tr from-white to-[#0098B9] relative md:overflow-hidden">
        
        {/* Logo Section */}
        <div className="flex justify-between items-center p-4 md:p-[20px]">
            <a className="w-[150px] md:w-[200px]">
                <img src={hospitalLogo} alt="hospitalname" />
            </a>
            <a className="w-[40px] md:w-[50px]">
                <img src={smallLogo} alt="log" />
            </a>            
        </div>

        {/* Content Section */}
        <div className="relative flex flex-col md:flex-row justify-center items-center h-full px-6">
            
            {/* Left Content */}
            <div className="text-center md:text-left md:w-1/2">
                <h1 className="text-3xl md:text-4xl font-bold">Walking in Compassion,</h1>
                <h1 className="text-3xl md:text-4xl font-bold mt-[10px]">Serving <span className="text-[#043A53]">with Love</span></h1>
                <p className="text-2xl md:text-4xl font-bold text-white mt-[15px]">CARDIOLOGY DEPARTMENT</p>
                <p className="text-[#62676E] leading-[1.5] mt-[20px] w-full md:w-[400px] mx-auto md:mx-0">
                    To undertake specialized and holistic healthcare services of world standard 
                    and to provide them to all sections. To undertake specialized and holistic  
                    healthcare services of world standard.
                </p>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-[30px] mt-[50px] justify-center md:justify-start">
                    <button 
                        onClick={() => navigate("/admin-login")} 
                        className="bg-white text-black text-lg px-6 py-3 w-full md:w-[200px] rounded-full hover:bg-[#043A53] hover:text-white transition duration-300"
                    >
                        Admin Login
                    </button>

                    <button 
                        onClick={() => navigate("/login")}  
                        className="bg-[#28a745] text-white text-lg px-6 py-3 w-full md:w-[250px] rounded-full hover:bg-[#043A53] hover:text-white transition duration-300"
                    >
                        Book Appointment
                    </button>
                </div>
            </div>

            {/* Right Image (Hidden on Small Screens) */}
            <div className="hidden md:block md:w-1/2 text-center">
                <img
                    src={doctorImage}
                    alt="Doctor"
                    className="w-[300px] md:w-[600px] mx-auto drop-shadow-xl md:ml-[100px]"
                />
            </div>

        </div>
    </div>
  );
};

export default Mainpage;
