import { useNavigate } from "react-router-dom";
import { hospitalLogo, smallLogo} from '../assets/images/Index.jsx';
import doctorImage from "../assets/images/sp-img.svg"; 

const Mainpage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-tr from-white to-[#0098B9] relative overflow-hidden">
        
        <div className="flex justify-end p-[20px] ">
            <a className="w-[200px]"><img src={hospitalLogo} alt="hospitalname" /></a>
            <a className="w-[50px]"><img src={smallLogo} alt="log" /></a>            
        </div>
        <div className="relative flex flex-col  md:flex-row  justify-center h-full px-6">
            <div className="mt-[10px]" >
                <h1 className="text-4xl font-bold ">Walking in Compassion, </h1>
                <h1 className="text-4xl font-bold mt-[10px]">Serving <span className="text-[#043A53]">with Love</span></h1>
                <p className="text-4xl font-bold text-white mt-[15px]">CARDIOLOGY DEPARTMENT</p>
                <p className="text-[#62676E] leading-[1.5] mt-[20px] w-[400px]">
                To undertake specialized and holistic healthcare services of world standard 
                and to provide them to all sections To undertake specialized and holistic  
                healthcare services of world standard  <br/>
                </p>
                <div className="flex gap-[30px] mt-[50px]">
                <button onClick={() => navigate("/admin-login")} className="bg-white text-black text-[18px] px-6 py-3 mt-[30px] w-[200px] rounded-[45px] hover:bg-[#043A53] hover:text-white transition duration-300">
                    Admin Login
                </button>

                <button onClick={() => navigate("/login")}  className="bg-[#28a745] text-white text-[18px] px-6 py-3 mt-[30px] w-[250px] rounded-[45px] hover:bg-[#043A53] hover:text-white transition duration-300">
                    Book Appointment
                </button>
            </div>
        </div>
        <div className="hidden md:block w-1/2 text-center">
          <img
            src={doctorImage}
            alt="Doctor"
            className="w-[600px] mx-auto drop-shadow-xl ml-[100px] "
          />
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
